/* API for the judging board. Storage is Upstash Redis (REST); the token never leaves the server.

   Redis keys (all prefixed "djb:" so they're easy to find in the Upstash data browser):
     djb:judges              SET   every judge's email
     djb:judge:<email>       HASH  email, name, created_at, last_seen
     djb:scores:<email>      HASH  field "<product>:<option>" → JSON {draft, goal, notes: {draft, goal}, done: true|false, updated_at}

   Routes:
     POST /api/login    {email, name}   sign in
     POST /api/unlock   {passcode}      @gojuly.ai only: unlocks the "View all judges" view for this session
     POST /api/logout
     GET  /api/me
     GET  /api/scores   the signed-in judge's own scores
     PUT  /api/scores   {product, option, draft, goal, notes}
     GET  /api/all      organizers only: every judge and every score */
import crypto from "node:crypto";

const P = "djb:";
// Stored option ids. To hide one, drop it here and mark it "hidden": true in DATA in index.html.
const OPTIONS = { alta: ["A", "B", "C", "D", "E", "F"], canopy: ["A", "B", "C", "D", "E", "F"] };
const CRIT = ["draft", "goal"]; // keep in step with CRIT in index.html
const ADMIN_DOMAIN = "gojuly.ai";
const COOKIE = "djb_session";
const SESSION_DAYS = 30;

const env = k => process.env[k] || "";
const fail = (status, message) => Object.assign(new Error(message), { status });

/* ---------- Redis over REST ---------- */
async function pipe(cmds) {
  const url = env("UPSTASH_REDIS_REST_URL").replace(/\/+$/, ""), token = env("UPSTASH_REDIS_REST_TOKEN");
  if (!url || !token) throw fail(500, "The database isn't configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.");
  const r = await fetch(url + "/pipeline", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
  });
  const j = await r.json().catch(() => null);
  if (!r.ok || !Array.isArray(j)) throw fail(502, "Database error" + (j && j.error ? ": " + j.error : ""));
  return j.map(x => { if (x.error) throw fail(502, "Database error: " + x.error); return x.result; });
}
const hash = arr => { const o = {}; for (let i = 0; i + 1 < (arr || []).length; i += 2) o[arr[i]] = arr[i + 1]; return o; };

/* ---------- sessions: signed cookie ---------- */
const secret = () => env("SESSION_SECRET") || crypto.createHash("sha256").update("djb-session:" + env("UPSTASH_REDIS_REST_TOKEN")).digest("hex");
const mac = s => crypto.createHmac("sha256", secret()).update(s).digest("base64url");
function safeEq(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}
function readSession(req) {
  const c = Object.fromEntries((req.headers.cookie || "").split(/;\s*/).filter(Boolean).map(p => { const i = p.indexOf("="); return [p.slice(0, i), p.slice(i + 1)]; }));
  const [b, m] = String(c[COOKIE] || "").split(".");
  if (!b || !m || !safeEq(m, mac(b))) return null;
  try { const s = JSON.parse(Buffer.from(b, "base64url").toString()); return s.x > Date.now() ? s : null; } catch { return null; }
}
function writeSession(req, res, s) {
  const secure = req.headers["x-forwarded-proto"] === "https" || req.socket?.encrypted ? "; Secure" : "";
  if (!s) return res.setHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`);
  const b = Buffer.from(JSON.stringify(s)).toString("base64url");
  res.setHeader("Set-Cookie", `${COOKIE}=${b}.${mac(b)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}${secure}`);
}

/* ---------- helpers ---------- */
async function body(req) {
  if (req.body != null) return typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body;
  let raw = "";
  for await (const chunk of req) { raw += chunk; if (raw.length > 20000) throw fail(413, "Request too large."); }
  try { return JSON.parse(raw || "{}"); } catch { throw fail(400, "Invalid JSON."); }
}
function send(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}
const isAdminEmail = e => e.endsWith("@" + ADMIN_DOMAIN);

/* ---------- routes ---------- */
async function login(req, res) {
  const b = await body(req);
  const email = String(b.email || "").trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw fail(400, "Enter a valid email address.");
  const name = String(b.name || "").trim().slice(0, 60);
  if (!name) throw fail(400, "Enter your name.");
  const admin = false; // organizer view is unlocked later via /api/unlock
  const now = new Date().toISOString(), k = P + "judge:" + email;
  const cmds = [["SADD", P + "judges", email], ["HSETNX", k, "created_at", now], ["HSET", k, "email", email, "last_seen", now]];
  if (name) cmds.push(["HSET", k, "name", name]);
  cmds.push(["HGET", k, "name"]);
  const r = await pipe(cmds);
  writeSession(req, res, { e: email, a: admin, x: Date.now() + SESSION_DAYS * 86400e3 });
  return { email, name: r[r.length - 1] || "", admin, canAdmin: isAdminEmail(email) };
}

async function myScores(email) {
  const [h] = await pipe([["HGETALL", P + "scores:" + email]]);
  const out = {};
  for (const [field, json] of Object.entries(hash(h))) {
    const [product, option] = field.split(":");
    try { (out[product] ||= {})[option] = JSON.parse(json); } catch {}
  }
  return out;
}

async function saveScore(req, email) {
  const b = await body(req);
  const product = String(b.product || ""), option = String(b.option || "");
  if (!OPTIONS[product] || !OPTIONS[product].includes(option)) throw fail(400, "Unknown product or option.");
  const row = {};
  for (const c of CRIT) {
    const v = b[c];
    if (v == null || v === "") row[c] = null;
    else if (Number.isInteger(v) && v >= 1 && v <= 5) row[c] = v;
    else throw fail(400, `${c} must be a whole number from 1 to 5.`);
  }
  const src = b.notes && typeof b.notes === "object" ? b.notes : {};
  row.notes = Object.fromEntries(CRIT.map(c => [c, String(src[c] ?? "").slice(0, 500)]));
  row.done = b.done === true; // judge marked this option finished
  row.updated_at = new Date().toISOString();
  await pipe([
    ["HSET", P + "scores:" + email, product + ":" + option, JSON.stringify(row)],
    ["HSET", P + "judge:" + email, "last_seen", row.updated_at],
  ]);
  return { ok: true, updated_at: row.updated_at };
}

async function everything() {
  const [emails] = await pipe([["SMEMBERS", P + "judges"]]);
  if (!emails.length) return { judges: [], scores: [] };
  const res = await pipe(emails.flatMap(e => [["HGETALL", P + "judge:" + e], ["HGETALL", P + "scores:" + e]]));
  const judges = [], scores = [];
  emails.forEach((email, i) => {
    const j = hash(res[i * 2]);
    judges.push({ email, name: j.name || "", created_at: j.created_at || "", last_seen: j.last_seen || "" });
    for (const [field, json] of Object.entries(hash(res[i * 2 + 1]))) {
      const [product, option] = field.split(":");
      try { scores.push({ email, product, option, ...JSON.parse(json) }); } catch {}
    }
  });
  judges.sort((a, b) => a.created_at.localeCompare(b.created_at));
  return { judges, scores };
}

export async function handle(req, res) {
  try {
    const path = new URL(req.url, "http://x").pathname.replace(/\/+$/, "");
    const m = req.method;
    if (path === "/api/login" && m === "POST") return send(res, 200, await login(req, res));
    if (path === "/api/logout" && m === "POST") { writeSession(req, res, null); return send(res, 200, { ok: true }); }
    const s = readSession(req);
    if (!s) return send(res, 401, { error: "Not signed in." });
    if (path === "/api/me" && m === "GET") {
      const [h] = await pipe([["HGETALL", P + "judge:" + s.e]]);
      return send(res, 200, { email: s.e, name: hash(h).name || "", admin: !!s.a, canAdmin: isAdminEmail(s.e) });
    }
    if (path === "/api/unlock" && m === "POST") {
      if (!isAdminEmail(s.e)) return send(res, 403, { error: `Only @${ADMIN_DOMAIN} emails can view all judges.` });
      const b = await body(req);
      if (!env("ADMIN_PASSCODE")) return send(res, 403, { error: "Organizer access isn't set up yet: add ADMIN_PASSCODE to .env." });
      if (!safeEq(String(b.passcode || ""), env("ADMIN_PASSCODE"))) return send(res, 401, { error: "That passcode is wrong." });
      writeSession(req, res, { ...s, a: true });
      return send(res, 200, { ok: true });
    }
    if (path === "/api/scores" && m === "GET") return send(res, 200, await myScores(s.e));
    if (path === "/api/scores" && m === "PUT") return send(res, 200, await saveScore(req, s.e));
    if (path === "/api/all" && m === "GET") {
      if (!s.a) return send(res, 403, { error: "Organizer access only." });
      return send(res, 200, await everything());
    }
    return send(res, 404, { error: "Not found." });
  } catch (e) {
    if (!e.status) console.error(e);
    return send(res, e.status || 500, { error: e.status ? e.message : "Server error." });
  }
}
