# Design Evaluation Panel

A scoring page for blind design reviews. Judges sign in with their email and score each option. Scores are saved in Upstash Redis. Signing in again with the same email brings a judge's scores back so they can edit them. Organizers can switch on a view of every judge's scores.

## Run it

```
npm start
```

Then open http://localhost:8000 (or set another port with `PORT=8001 npm start`). There are no dependencies to install. You need Node 18 or newer.

The server reads `.env`, which needs:

```
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
ADMIN_PASSCODE="..."   # unlocks the View all judges toggle for @gojuly.ai accounts
SESSION_SECRET="..."   # any long random string; signs the login cookie
```

`.env` is git-ignored. Don't serve this folder with a plain static server such as `python -m http.server`: that would expose `.env`.

## Deploy to Vercel

Import the repo with the **Other** preset, keep the root directory `./`, and leave the build settings empty. Under Environment Variables, add the same four values as in `.env`. Each file in `api/` becomes a function that hands off to `lib/api.js`.

## Who sees what

| Person | Signs in with | Sees |
|---|---|---|
| Judge | Email and name | Only their own scores |
| Organizer | An `@gojuly.ai` email and name | Their own scores, plus a **View all judges** toggle. The toggle asks once for the organizer passcode, then shows every judge's scores, the averages and notes, and a CSV export. |

The server enforces these rules on every request. A judge's browser can't fetch another judge's scores.

Emails aren't verified. Anyone who knows a judge's email could sign in as that judge. That's fine for a trusted panel. Only @gojuly.ai accounts see the toggle, and the server also requires the passcode, so typing a made-up @gojuly.ai address isn't enough.

## Where the data lives

In the Upstash console → Data Browser. Every key starts with `djb:`:

| Key | Type | Holds |
|---|---|---|
| `djb:judges` | Set | Every judge's email |
| `djb:judge:<email>` | Hash | `email`, `name`, `created_at`, `last_seen` |
| `djb:scores:<email>` | Hash | One field per option, such as `alta:B`, holding `{draft, goal, notes, done, updated_at}`, with one note per criterion and a done flag for the option |

Option ids are the stored keys and never change. To hide an option, mark it `"hidden": true` in `DATA` in `index.html` and drop it from `OPTIONS` in `lib/api.js`. The page then relabels the rest A, B, C… in order, while scores stay under their stored ids. The CSV has an `option` column (the shown letter) and an `option_id` column (the stored id).

Averages and the cross-judge view are calculated from these keys when an organizer opens them, so there's no separate summary to keep in sync.

## Code

- `server.js`: serves the page and the API
- `lib/api.js`: sign-in, sessions, and reading and writing scores
- `index.html`: the board
