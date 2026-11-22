# Canopy Interviewer Workspace: Design Process

Nov 12, 2026 · @Ruolan

## Summary

The final design turns Canopy's interviewer workspace from three panels of contact details, a job description and a blank scorecard into one focused flow: Prepare, Interview, Score, Done. The interviewer's two criteria carry through every step. The brief reads in about two minutes, against a five-minute guardrail.

The design went through three draft directions, one simulated field test and twelve published versions. Each version answered a specific critique: on structure, content, type, color, motion, navigation or alignment.

| Artifact | What it holds |
| --- | --- |
| [Final design](https://claude.ai/artifact/5ZdukT2a9yGCFCtJ9KXLA8) | Live 1440×900 flow, before vs after, rationale, north-star effect, review log |
| [Draft directions](https://claude.ai/artifact/CnpN9xBgt6VVrxh7oHWqiP) | D1 safe, D2 radical, D3 middle ground, as live mockups |
| [D2 field test](https://claude.ai/artifact/RLQrFbxRx2MFhYauk7veYE) | Simulated on-site test with six personas, 12 findings, D2.1 |

## The brief

Canopy is the hiring product of Green Jobs Board, a climate job marketplace. The challenge: help an occasional interviewer walk into an interview knowing what it is for, what to ask and what the panel already covered, in five minutes.

- **User:** engineers, field leads and managers who interview a few times a month, rarely trained, opening Canopy minutes before the call.
- **Scenario:** Owen Park, construction manager, site visit with Jordan Ellis (they/them) at 2:00 at the Brighton substation. Interview 5 of 5. His criteria: power systems knowledge and working with field crews.
- **Problem today:** the page leads with contact details, a job description and a blank scorecard of five criteria. Nothing says which interview this is or what earlier interviews asked.
- **North star:** share of interviews where the interviewer scores every criterion their interview covers, with written evidence, within 24 hours.
- **Guardrail:** preparing takes no more than 5 minutes for someone who has never seen the role.
- **Rules:** feedback stays blind; the plan and rubric are the team's words; nothing is generated; scorecard fields stay as they are.

## Discovery

The most leveraged screen is the workspace in the ten minutes before the interview: evidence is collected during the call, so an interviewer who does not know their two criteria cannot recover it in the scorecard.

**Context.** Canopy is an applicant tracking system inside a climate job board. General-purpose competitors (Greenhouse, Lever, Ashby) are built for recruiters; climate job boards (Climatebase, Work on Climate) stop at posting. Canopy can stand out by serving the occasional interviewer, with trust built in: blind feedback, the team's words only, no AI verdicts. Business model, assumed: employers pay; interviewers are free guest seats, so the experience needs zero onboarding.

**Golden flow (happy path).**

1. Owen is added to the panel; the team has written the plan, rubric and questions.
2. At 1:50 he opens the workspace and learns which interview this is and which two criteria are his.
3. He sees what the four earlier interviews asked, without their conclusions.
4. He sees what about Jordan is worth probing.
5. He picks up the team's questions and runs the visit.
6. Afterwards he scores his criteria with evidence and submits; the blind lifts.

**Why this screen.** Every interviewer opens it, every time, under time pressure. Today's version fails all four hypotheses in the brief: purpose unclear, panel invisible, candidate scattered, no help for first-timers.

## Three directions

D2, the radical call sheet, was chosen because it made the purpose of the hour clearest in the shortest read: 2:50 against the 5:00 guardrail.

| Direction | Idea | Inspiration | Prep time | Trade-off |
| --- | --- | --- | --- | --- |
| D1 Safe: prep-first panels | Keep three panels; a banner names the interview and its two criteria; the job description gives way to the panel so far | Familiar ATS interview kits | 3:35 | Three areas still compete; scorecard visible before the call |
| D2 Radical: call sheet | One column: two criteria, what's already asked, your questions; then one question at a time; scorecard only after | Film call sheet, recipe cook mode, presenter view | 2:50 | Biggest behaviour change |
| D3 Middle: coverage map | A criteria × interviews grid with Owen's column highlighted; Prepare / Interview / Score modes | Software test-coverage matrix, scouting assignments | 3:20 | A matrix asks more of a first-time reader |

One finding carried into every later version: the team's third site-visit question is close to Lena's earlier as-built drawing scenario. The design cannot change the question, so it flags the overlap.

## Simulated field test of D2

D2's purpose held up, but the substation exposed three problems a desk never would: no signal, no free hands, and a candidate standing next to the screen. The study is simulated with six personas built from the brief, not real research; its findings are hypotheses for a real test.

| Finding | Severity | Change made |
| --- | --- | --- |
| Brief doesn't load in a substation dead zone (4 of 6) | Critical | Saved offline on first open; send to phone |
| Nobody types while walking a live site (5 of 6) | Critical | First tap marks, later replaced by a three-word note per question |
| Candidate can see the screen (3 of 6) | Major | Interview view shows the question only, no panel details |
| Questions sat apart from their criteria (4 of 6) | Major | Each question nested under its criterion |
| Already-asked list read as people, not topics (4 of 6) | Major | Topics struck through |
| Candidate facts at the bottom were missed (4 of 6) | Major | A “go deeper” line in the brief body |
| Q3 repeated Lena's scenario (2 of 6) | Major | Overlap flag restored |
| Dark cue screen unreadable in sun (2 of 6) | Minor | Light, high-contrast type |

What worked and stayed: one sentence of purpose, one question at a time, the scorecard hidden until the end, and the reminder of Jordan's own question.

## Version history

Twelve versions moved the design from a desktop three-panel page to a single focused flow. Each one answered one critique. Newest first.

| Version | Critique | What changed | Why |
| --- | --- | --- | --- |
| v12 | Criteria status wrapped in the rail | Name and status on one line, status right-aligned, leading dot dropped | A rail item is one line, one glance |
| v11 | Alignment problems | One icon + text grid in the rail (icons at 36 px, text at 76 px); rail and content share top and bottom edges; card dots hang in the margin; Done locked until submit | Measured in the browser, every offset now 0 |
| v10 | Rail highlight bug, too many captions, cramped | Floating highlight removed; current step marked by its own ring; captions cut; more space; last two notes side by side | A highlight measured before the font loaded sat off-center |
| v9 | Top bar crowded; drawer hidden and hard to scan | Vertical step rail replaces the top bar; drawer retired; who asked what becomes four columns; tips inline under each question | Status belongs on its step; context needed before the call should not hide behind a click |
| v8 | Too many type levels; no depth; review motion | Two sizes (40 / 16), two weights; three elevation levels; 14-item motion audit | Headline at 2.5× body makes hierarchy obvious; every motion gets a role and a timing |
| v7 | Simplify; clearer hierarchy; smoother motion | Three tiers (focus, work, reference); screens hand over with an exit and entrance | Measured: Prepare 184 to 170 words, 9 to 4 white surfaces |
| v6 | Font too tight; too many levels; green clashes; motion | Figtree at normal spacing; 32 / 16 / 14; green-tinted canvas, no neon lime; direction-aware transitions | Accent and canvas now share one hue |
| v5 | Reskin from 45 reference screens | Borderless white cards, pills, one sans, sentence case, deep green + lime | References: Chime, AllTrails, Mercury, Sana, Pliability |
| v4 | Content strategist review | 14 copy fixes, a glossary, three content principles | Removed a quote no one wrote and two places where the page contradicted itself |
| v3 | “Can a timestamp alone help recall?” | Timestamp taps replaced by a three-word note per question; Score opens right after the visit | A bare time is a weak memory cue; the interviewer's own words are a strong one |
| v2 | Prepare and Score felt like heavy desktop pages | One frame for all four steps; the two criteria become the thread; NN/g heuristic review | The four steps should read as one flow |
| v1 | Build D2.1 at 1440 px | Brief, Interview, Score, Submitted at desktop size | Turn the call sheet into the challenge's required deliverable |

## Final design system

One typeface in two sizes, one green, three shadow levels and one easing curve carry the whole flow.

| Area | Decision |
| --- | --- |
| Layout | 272 px step rail on the left (back link, candidate, four steps, two criteria, tips); 880 px content column; one action bar at the bottom |
| Type | Figtree; 40 px headline and 16 px everything else; weights 400 and 600; sentence case, no all caps |
| Color | Canvas #F2F5F3, white cards, green #1E6B4E for actions and progress, mint #D9EFE2 for done, ink #15201B |
| Hierarchy | Focus (headline, primary button) → work (white fields and cards) → reference (plain gray text on the canvas) |
| Elevation | e1 resting surfaces; e2 hover, focus and raised; green shadow on primary and selected; e3 toast |
| Motion | Only on user action. 120 ms state, 90 + 160 ms content swap, 120 + 200 ms screen handover in the direction of travel, 240 ms progress; one curve; off under reduced motion |
| Rail grid | 24 px icon column + 16 px gap, so all rail text starts at the same edge |

## Before vs after, and expected effect

The page now leads with what the hour is for, where it used to lead with contact details; every other change follows from that.

|  | Before (Canopy today) | After (final design) |
| --- | --- | --- |
| Leads with | Contact details | “Your hour with Jordan covers two things” |
| Which interview | Not shown | Site visit, today 2:00–3:00, last of 5 |
| Criteria | All five wait on a blank scorecard | Two cards, each with the team's questions under it |
| Earlier interviews | Invisible | Four columns: who, which interview, topics asked; no ratings |
| Candidate facts | Split across contact details and a job description | The one fact to go deeper on, and Jordan's own question |
| First-timer help | None | One tip under each question, switchable |
| During the call | Same three panels | One question at a time, a private three-word note |
| Scorecard | Visible from the start; framed as a queue (“1 of 10”, “Submit and next”) | Opens when the visit ends, one criterion per screen, notes beside each question |

**Rationale (209 words, in the artifact).** The flow is one focused frame in four steps, with the two criteria as the thread. The brief reads in about two minutes. The panel appears only as plan and status. Every word comes from the team or the candidate, and the scorecard keeps all its fields.

**Expected effect on the north star.** Each part of the metric has a lever: two criteria lead the brief and submission needs both (every criterion); notes per question become prompts beside each question (written evidence); ending the interview opens scoring (within 24 hours). Hypothesis: +15 to 25 points in a four-week A/B test, with median prep time at or under 5 minutes.

**Rules kept.** Blind until submit; criteria, definitions and questions verbatim; no recording, transcription or generated text; all scorecard fields kept.

**Open questions.**

- Do three words per answer rebuild an answer an hour later? Test with real interviewers.
- The rubric has no description per score level. Ask the team to add one.
- The team needs to tag each question with a criterion when writing the plan.
- Motion and lift were timed in the browser, not watched by users.

## Lessons

The changes that mattered most came from questioning assumptions, not from polish.

- **Question the mechanism, not the screen.** “Can a timestamp alone help recall?” removed a feature that looked clever and did not hold up.
- **Content can contradict itself.** The content review found the page telling Owen to skip a question it also gave him, and quoting words Jordan never wrote.
- **Fewer levels read faster.** Type went from three families and five sizes to one family and two sizes; hierarchy got clearer each time a level was removed.
- **Measure, don't eyeball.** Word counts, surface counts, motion timings and alignment offsets were measured in the browser, which caught bugs a screenshot hid.
- **Simulations are hypotheses.** The field test shaped D2.1, but every finding still needs real interviewers at a real site.
