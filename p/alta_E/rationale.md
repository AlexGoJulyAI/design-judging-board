# Alta Home and Add Items: design rationale

The redesign is built on one idea: Alta's value is making the outfit decision easier, not generating more outfit options. Home leads with one outfit and a "Wear this today" button, and Add Items asks only about the pieces the AI isn't sure of.

## The problem
Alta builds outfits from clothes people already own, but uploading clothes, navigating recommendations and deciding what to wear can take more work than picking an outfit yourself.

**Goal:** make choosing an outfit faster for busy professionals, and grow weekly retained outfit planners.
**Hypothesis:** less effort to build a wardrobe and to pick an outfit turns Alta into a daily habit. The redesign changes how information is collected and shown, not Alta's AI.

## Golden flow
| Stage | Steps | Outcome |
| --- | --- | --- |
| Set up | Onboard → upload photos → review only the uncertain items → see the outfits the new clothes unlock → first recommendation | A wardrobe with little manual effort, and its value shown straight away |
| Daily | Open Alta → one outfit for today's weather and occasion, on a model → swap a piece or see 2 alternatives → "Wear this today" → shopping (optional) | A confident choice in a few actions |
| Repeat | Plan tomorrow or an occasion → reuse a past outfit → come back weekly | Choosing becomes a habit |

**Core loop:** open → see the outfit → adjust if needed → confirm → return.

## Why these screens
- **Home (primary):** where people come back each day to decide. The old Home put calendar and social content above the recommendations, pushing Alta's core value to the bottom.
- **Add Items (secondary):** the old screen made people review each item, with several controls per item. Easier uploads mean more wardrobe data and better recommendations.
- **Calendar (not chosen):** it mainly helps people who already have a history of outfits. Its most useful parts, planning ahead and reuse, moved into Home.

## Direction
Four directions were explored: One Look (one primary outfit), Day Planner (built around occasions), Go-To Looks (reuse past outfits) and Closet Unlocks (show what new clothes make possible). One Look was the foundation because it most directly speeds up the decision. The other three were folded in for context, reuse and setup.

## Key decisions
| Decision | Why |
| --- | --- |
| One outfit up front, 2 alternatives behind navigation | Several equal options recreate the decision fatigue Alta should remove |
| Outfit at the top of Home, "Wear this today" under it, no scrolling | The old screen put supporting content ahead of the job people came to do |
| Weather and occasion built in: Work, Meetings, Home, Out, Event | No blank prompt to fill in every day |
| Outfit shown on a model, with the pieces alongside | Shows how the pieces work together, and which piece to swap |
| Confident items added automatically; only uncertain ones need review | Confirming every item makes setup slow; corrections stay possible |
| Compact grid with specific questions ("Navy or black?") | The old view fit about 3 items per screen; "Retry" was ambiguous |
| Show how many outfits the upload unlocked, then today's pick | Rewards the setup effort and links it to the daily outfit |
| "Wear again" on Home; morning shows today, evening shows tomorrow | No new outfit needed every day, and no calendar digging |
| Labelled partner products below the outfit | Shopping complements the outfit instead of competing with it, which keeps trust |

## Visual design
Early versions used warm backgrounds, editorial type, rounded cards and pills, which competed with the outfit. The final design drops shadows, most pills and cards and adds whitespace. Type is cut to 3 sizes and 5 size-and-weight pairs, descriptions are shorter, and the outfit and button are the strongest elements. Principle: every element should help people understand the recommendation or act on it.

## Evaluation
The design was checked against 8 criteria: decision speed, comprehension, trust in the recommendation, finding outfits, clear ownership, upload effort, visible value and planning. The first round led to these fixes:
- Shorter outfit card so navigation no longer hides the button.
- Clearer occasion names.
- "Owned" labels to separate the person's clothes from shopping picks.
- More explicit item names, categories and questions in the upload review.
- Confirmation before destructive actions.
- Tomorrow's outfit made more prominent in the evening.

A second round met all 8 criteria. Both rounds were simulated scenarios and prototype tests, not sessions with real users, so they point to likely improvements rather than proven ones.

## Open questions
- Model imagery quality is unresolved, and it matters because the outfit visual is the centre of the experience.
