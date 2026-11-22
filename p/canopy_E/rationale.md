# Canopy Interviewer Workspace: design rationale

The final design is one page shaped like the job: two cards, one per criterion Owen scores. It cut the workflow from 12 steps to 7 and the reading before 2:00 to about 150 words.

## The problem
Interviewers walk in unprepared. They repeat questions, skip criteria and write vague feedback, so the panel's evidence is incomplete and hard to compare, and the decision rests on gut feel.

Today the page:
- Leads with contact details and a job description.
- Leaves all 5 criteria unmarked in the scorecard.
- Hides the 4 earlier interviews.
- Leaves out the 12 MW project, the PE license and Jordan's question.
- Reads as a queue ("1 of 10", "Submit and next"), not preparation for a conversation.
- Shows the empty scorecard from minute one, pulling attention to judging before listening.

**Root cause:** the tool is designed around the record (a profile plus a form) instead of the interviewer's hour (a briefing, a conversation, a write-up).

## Why this screen
The interviewer workspace before the interview, with a during-interview state. It's where the failure starts, and it's the only screen occasional interviewers reliably open. The plan, rubric, questions and application already exist, so this is a reordering problem, not a new-data problem.

## Who it's for
Owen interviews 3–4 times a month and opens Canopy at 1:50, ten minutes before. He is probably at or driving to the substation, not at a desk, and is deep in field work but not a grid engineer. His top needs: know which interview this is and which criteria are his; see what the panel already asked, not what it concluded; have the team's questions mapped to his criteria.

**Key insight:** Owen doesn't think "prep, then interview, then score". He thinks: "I'm checking two things. Here's how I'll check each, and what I saw."

## Golden flow: Owen's site visit
| # | Time | Moment | What Owen does | What he needs |
| --- | --- | --- | --- | --- |
| 0 | Days before | Assigned | Is invited to Solaris' Canopy as the site visit interviewer | Knows a role and candidate exist |
| 1 | 1:50 | Open | Opens Interviews → Jordan Ellis → workspace | Lands on his interview, not a queue |
| 2 | 1:50–1:51 | Orient | Reads: site visit, 5 of 5, 2:00–3:00, Brighton substation, covers Power systems knowledge and Working with field crews | Purpose and his 2 criteria with definitions |
| 3 | 1:51–1:53 | Panel map | Sees Theo, Ravi, Lena and Nina are done, and what each asked | Topics, not verdicts |
| 4 | 1:53–1:54 | Candidate | Notes the 12 MW solar upgrade, the Colorado PE license, Jordan's field-time question | Facts from the application in one place |
| 5 | 1:54–1:55 | Plan | Picks from the team's 3 site-visit questions, each tied to a criterion | Ready questions; optional guidance |
| 6 | 2:00–3:00 | During | Runs the interview; notes evidence against his 2 criteria | Note-taking tied to criteria |
| 7 | 3:00–3:15 | Score | Rates his 2 criteria 1–4 with notes alongside, then rating and recommendation | Scoring feels like finishing |
| 8 | Within 24 h | Submit | Submits; answers "Did you repeat a question someone else asked?" | Clear confirmation |
| 9 | After | Unlock | Sees the panel's feedback | — |

Steps 1–5 must fit in 5 minutes. Steps 6–8 drive the north star.

## Evidence that shaped it
- 62% of interviewers get no interview training; interview guides are used about 40% of the time (Greenhouse).
- Structured interviews are the top predictor of job performance, r ≈ .42 (Sackett et al. 2022).
- Interviewers who peeked at a colleague's scorecard were 3.6% more likely to give the identical rating (Greenhouse).
- Only 74.7% of scorecards arrive within 24 hours (Metaview, n = 811k).
- Notes on specific behaviour improve validity; judgmental notes hurt it (Burnett, Fan & Motowidlo 1998).
- No competitor separates what earlier interviews covered from what they concluded.

**Differentiation:** Canopy is the only interviewer workspace that shows the panel's map without its verdicts, and everything on it was written by a person.

## Key decisions
| Decision | Why |
| --- | --- |
| Organise the page by Owen's 2 criteria, not by data type | The rubric becomes the page's skeleton; his mental model is the layout |
| One column, read top to bottom; no tabs or modes | He interviews monthly and won't remember the tool |
| "Already covered" strip: topic chips, names, one lock line | Shows what was asked, never ratings or notes |
| One flag: "Lena asked something similar this morning" | The plan can't be edited, so the overlap is flagged instead |
| Notes typed under the criterion during the call | Notes not taken during the call are gone by scoring time |
| Scoring opens only on "Done interviewing · Score" | Nudges him away from judging mid-conversation |
| Sticky bar shows the next action and what's missing | Keeps submission moving toward the 24-hour goal |
| Tips collapsed to a link of 4 one-line tips | First-timers get coaching; veterans skip it |
| 15px body, 18–21px questions, 44–46px targets | Built for a laptop on a tailgate, not a desk |
| Facts carry their source; "Score 1 to 4" | Nothing is generated and the team's rubric isn't reinterpreted |

## How it got here
The first prototype used three tabs (Prepare, Interview, Score). It beat Canopy today on all five evaluation criteria, but three copy issues broke the brief's rules: Canopy-written advice about the candidate, an invented scale label and follow-up question chips. A heuristic and content review fixed them and set a 10-second test. The final simplification removed the tabs and modes once the design was checked against Owen's real situation.

## Trade-offs and open questions
- Less panel detail by default; a "See each interview" disclosure can be added if interviewers want it.
- No separate during-interview screen; the same page serves before and during.
- Contact details moved to Jordan's profile.
- Topic chips like "Power-flow exercise" may not be clear to Owen; test it.
- The 1–4 scale has no level descriptions; the team should write them.
- Scores are self-assessed, not tested with users.
