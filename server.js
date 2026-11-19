/* Local server: serves the board and its API. Run with `npm start` (or `node server.js`), then open http://localhost:8000. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

// Load .env without dependencies. Values already in the environment win.
try {
  for (const line of fs.readFileSync(path.join(ROOT, ".env"), "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m || process.env[m[1]] !== undefined) continue;
    let v = m[2];
    if (/^(["']).*\1$/.test(v)) v = v.slice(1, -1);
    process.env[m[1]] = v;
  }
} catch {}

const { handle } = await import("./lib/api.js");
const PORT = Number(process.env.PORT) || 8000;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".gif": "image/gif", ".woff2": "font/woff2" };
const PUBLIC = /^\/(index\.html|focus\.js|img\/[^]+|p\/[^]+)$/; // never .env, lib/, server.js

http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(new URL(req.url, "http://x").pathname); } catch { res.statusCode = 400; return res.end("Bad request"); }
  if (p.startsWith("/api/")) return handle(req, res);
  if (p === "/") p = "/index.html";
  const file = path.join(ROOT, p);
  if (!PUBLIC.test(p) || p.includes("..") || !file.startsWith(ROOT + path.sep)) { res.statusCode = 404; return res.end("Not found"); }
  fs.readFile(file, (err, data) => {
    if (err) { res.statusCode = 404; return res.end("Not found"); }
    res.setHeader("Content-Type", TYPES[path.extname(file).toLowerCase()] || "application/octet-stream");
    res.setHeader("Cache-Control", "no-cache"); // always check for a newer copy, so edits show on a normal reload
    res.end(data);
  });
}).listen(PORT, () => console.log(`Design Judging Board → http://localhost:${PORT}`));
