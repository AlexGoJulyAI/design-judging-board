# Alta Consumer Case Study — Design Process Log

Nov 12, 2026 · @Ruolan

## Summary

The final design, **Alta Tomorrow**, moves the outfit decision to the evening before. Alta reads tomorrow's calendar and weather, offers two looks labelled by what each is built for, and puts the chosen look on the lock screen in the morning. Prototype: [Alta Tomorrow](https://claude.ai/artifact/8NkG8koDLZDC6mRk42pfXw).

- **Challenge:** help busy millennials get dressed faster and more confidently, while keeping shopping relevant and nonintrusive.
- **North-star metric:** weekly retained outfit planners (users who come back in a later week and select or plan at least one outfit).
- **Friction prioritized:** too many steps to decide, at the worst possible moment (the morning rush).
- **Home outcome:** a 21:00 nudge from tomorrow's calendar, a this-or-that choice between two looks, and a zero-decision morning on the lock screen.
- **Add items outcome:** at most one gap question per evening, tied to tomorrow ("Rain from 16:00. Do you own a raincoat?"), answered with one photo.
- **How we got here:** v1 tried to do seven jobs on Home and lost focus. Iteration 2 explored three focused directions; the final design combines B (context, decided last night) with C (two choices).
- **Constraint respected:** AI recommendation quality is unchanged. Every change is about how information is collected, organized and displayed.

## Context download

Alta is a free AI stylist app for time-poor professionals aged roughly 30–45. Its promise is "look put-together, without putting in the work."

**Who it serves.** Global millennials balancing demanding careers and personal lives. They are style-conscious, budget-conscious and convenience-driven. They expect technology to remove decisions, not add admin.

**The pain it solves.** Morning decision fatigue: a full closet, "nothing to wear," and a default to the same few outfits. Alta also helps users get more value from clothes they already own.

**How it works.** Users digitize their wardrobe, get AI outfit combinations shown on a personal avatar, plan outfits on a calendar, and discover complementary products.

**Competitive landscape** (from general product knowledge; not verified for this exercise):

| Alternative | Examples | Where Alta differs |
| --- | --- | --- |
| Wardrobe apps | Whering, Indyx, Acloset, Stylebook, Cladwell | Most rely on manual entry and manual outfit building. Alta auto-detects items and renders looks on the user's avatar. |
| Inspiration feeds | Pinterest, Instagram | Inspiring, but built on other people's clothes, not the user's closet. |
| General AI chat | ChatGPT | Can discuss style, but does not know what the user owns. |
| The user's own habit | Grabbing the usual outfit | The real competitor. Alta must be faster than this every morning. |

**Business model.** Free to users. Revenue comes from recommending complementary fashion and beauty products through brand partnerships and shopping integrations. Exact arrangements are not public.

**North-star metric.** Weekly retained outfit planners. Shopping must stay relevant and nonintrusive while this number grows.

**Core tension.** Users come to use what they own; the business benefits when they discover new products. The design has to make these goals support each other.

## Golden user flow (happy path)

The core loop is steps 3 to 6. A user who repeats it in a later week counts toward the north-star.

1. **Onboard.** Pick style preferences and city; upload a photo to create a personal avatar.
2. **Add items.** Snap photos, screenshots or product links. AI removes backgrounds, names and categorizes each item. The user reviews and adds them.
3. **Open Home in the morning.** See today's date, weather and suggested outfits.
4. **Adjust (optional).** Swap one item, or ask Alta for something more formal.
5. **Choose.** Tap to wear or log the outfit for today.
6. **Saved to calendar.** The streak grows; the outfit can be found and reused later.
7. **Shop (optional).** See one complementary piece that completes or extends the look.
8. **Return next week** and repeat steps 3 to 6.

## Problem framing

We chose **Home** as the primary screen because the north-star action (select or plan an outfit) happens there, and the Day 3 churn moment in Alex's story happens there. **Add items** is the secondary screen because the brief requires it and an incomplete closet weakens every recommendation.

**Primary friction:** too many steps to decide. Supporting frictions: difficult retrieval (Home) and high input effort (Add items).

**What the current Home screen gets wrong**

| Issue | Evidence on screen | Effect on the user |
| --- | --- | --- |
| The decision is below the fold | "Today's suggestions" is a divider at the very bottom | The core job needs a scroll before it starts |
| Social content holds the hero space | "You and Júlia Machado logged" fills the middle of the screen | Comparison, not a decision, is the first thing seen |
| No primary action | No "wear this" or "choose" button anywhere | The user does not know what to do next |
| Saved looks are not reachable | Week strip shows silhouettes only | Alex cannot find the look she saved for client meetings |
| Small, unexplained signals | Streak icon with "2", help icon, bell | Visual noise competes with the task |
| No day context | Only weather; no plan or occasion | Suggestions cannot say why they fit today |

**What the current Add items screen gets wrong**

| Issue | Evidence on screen | Effect on the user |
| --- | --- | --- |
| Every item needs the same review | Retry, Add and Delete on every card | N items means up to 3N decisions |
| No confidence signal | All detections look equally certain | Users cannot tell what actually needs checking |
| Editing is hidden | A small pencil next to each name | Fixing a wrong category is slow |
| No payoff | Adding ends with a closed list | Users do not see why the effort was worth it |

The user feedback in the appendix (hard-to-navigate outfit history, item classification, shopping next to recommendations) points at the same issues. It is qualitative and motivates hypotheses only.

## Design principles and key decisions

First principle: Alta wins only if choosing an outfit in Alta is faster than grabbing the usual one. Every decision below reduces time to a confident choice, or makes effort pay off visibly.

**Principles**

1. **One decision per screen.** Home exists to answer "what do I wear today?" Everything else comes second.
2. **Default right, edit by exception.** Show the best answer and ask only where the system is unsure.
3. **Context in one tap.** Plan chips and weather replace blank inputs.
4. **Retrieval where the decision happens.** Saved looks sit next to today's pick, not only in a calendar.
5. **Commerce after value.** Shopping appears after the user has chosen, and is framed around the closet they own.
6. **Show the payoff.** Every input step ends by showing what it unlocked.

**Key decisions and trade-offs**

| Decision | Alternative considered | Why we chose it | Trade-off |
| --- | --- | --- | --- |
| One hero pick with 2 alternatives behind arrows | A grid of 4–6 suggestions | Fewer options means faster choice and less fatigue | Less browsing for users who enjoy exploring |
| Plan chips (Client meeting, Office day, Dinner) | "Ask Alta" chat as the main context input | One tap beats typing at 8am | Chips cover common cases only; chat stays available elsewhere |
| Swap a single piece | Regenerate the whole outfit | Keeps the parts the user liked | Needs closet depth per slot to feel useful |
| "Wear again" row on Home | Improve the calendar screen only | Fixes the Day 3 failure at the moment it happens | Adds length to Home; kept below the primary action |
| Partner pick only after logging | Inline products in the suggestions | Removes the conflict users reported | Fewer impressions; must earn higher relevance per impression |
| Pre-approve confident detections | Ask the user to confirm each item | Effort scales with uncertainty, not item count | Some wrong items slip in; mitigated by easy edit later |
| Success screen leads with outfits unlocked | Plain "Items added" confirmation | Turns admin into a reward and links to inspiration | Number must be honest and computed, not inflated |
| Friends' activity demoted below the fold | Keep it as the hero | Social is motivating but not the job at 8am | Possible drop in social engagement; worth measuring |

## Redesigned flow walkthrough

The interactive prototype covers 9 steps across both screens: [Alta Today Redesign](https://claude.ai/artifact/EKxx71FKwxKvTua2LUUUaL). It has a Redesign/Original toggle and a rationale panel for each step.

**Home ("Today")**

1. **Today, one decision.** Header shows date, weather (14°, rain after 4pm) and a "Week 2 streak" label. Plan chips set context: Client meeting 10:00, Office day, Dinner 7:30pm. The hero card shows one outfit as a flat lay, a reason line ("Polished for your 10:00 client meeting"), the pieces it uses, and one primary button: **Wear this today**. Arrows or a swipe reveal 2 alternatives.
2. **Swap one piece.** Tapping any piece opens a sheet with alternatives for that slot only, from the user's closet. The rest of the look stays; the reason line notes the edit.
3. **Wear again.** Below the pick, saved and past looks for today's plan ("Client pitch, worn Oct 28"). One tap moves a look into the hero with the same Wear action.
4. **Logged, then shop.** Wearing confirms the outfit, fills today on a weekly strip and grows the streak. Then one labelled partner pick appears, explained as "works with 9 outfits you already own," with **Not now** and a commission disclosure.

**Add items**

5. **Choose a source.** Opened from Home's closet card ("62% added; outerwear gives better rainy-day picks") or the + tab. Four batch sources: order emails, photos, camera, link or screenshot.
6. **Detect in batch.** Visible progress: finding clothes, removing backgrounds, naming and sorting, checking duplicates. Users can leave while it runs.
7. **Review by exception.** 5 confident items are pre-approved. 1 uncertain item asks one question (Cardigan, Jacket or Overshirt). Tap an item to edit name, category or colour; tap the tick to exclude it. One sticky button: "Add 6 items."
8. **Show the payoff.** "6 items added, 14 new outfits you can wear this week," a preview outfit with the new camel blazer, and closet progress from 62% to 74%.
9. **Home gets better.** Today's pick now uses the camel blazer and is labelled **New pick**. A banner confirms the upload paid off.

All outfits, items, the partner brand and prices in the prototype are illustrative sample data.

## Business thinking

The redesign grows weekly retained outfit planners by making the planning action cheaper (Home) and the closet more complete (Add items). Shopping becomes a reward after value, not a competitor to it.

**How each change moves the north-star**

| Lever | Change | Expected effect on the north-star |
| --- | --- | --- |
| Fewer steps to decide | Hero pick + one Wear action | More sessions end with a selected outfit |
| Faster retrieval | Wear again row on Home | Users with saved looks keep using Alta on busy mornings |
| Habit signal | Weekly streak, logged week strip | Gives a reason to return next week |
| Better inputs | Batch sources + review by exception | Fuller closets, so picks fit real life and get chosen more |
| Visible payoff | Outfits unlocked, New pick on Home | Links adding items to wearing them, closing the loop |

**Shopping without intrusion**

- One partner pick, shown only after an outfit is logged, labelled "Partner pick" with a commission disclosure and "Not now."
- Relevance is framed by the user's closet: a product is shown because it works with many outfits they own. This aligns commission revenue with the user goal of using what they own.
- "Not now" taps feed relevance, so placements get rarer for users who do not want them.

**Metrics plan**

| Metric | Type | Target direction |
| --- | --- | --- |
| Weekly retained outfit planners | North-star | Up |
| Time from app open to logged outfit | Driver | Down |
| Share of Home sessions ending in a logged outfit | Driver | Up |
| Share of logs that are reused looks | Driver | Up |
| Items added per upload session; taps per item | Driver | Up; down |
| Edits to auto-approved items within 7 days | Guardrail (quality) | Stays low |
| Partner tap-through rate per logged outfit | Business | Up, with log rate flat or up |
| "Not now" rate on partner picks | Guardrail (trust) | Stays low |

**Experiment.** A/B test the new Home against the current Home for new users over 4 weeks. Primary readout: week-2 and week-4 retained outfit planners. Ship if retention improves and partner revenue per weekly user does not fall.

## Risks, open questions and next steps

**Risks**

- **A single hero pick can feel narrow** for users who like to browse. Mitigation: arrows to 2 alternatives, swaps, and Discover elsewhere.
- **Auto-approval may let wrong categories in.** Mitigation: easy edit after adding; track edits as a guardrail.
- **Fewer partner impressions.** Mitigation: higher relevance per impression; measure revenue per weekly user, not impressions.
- **Plan chips need a data source.** A calendar connection is more work; manual chips are the fallback.

**Open questions**

- Can Alta read calendar events with consent, or should plans be set by the user?
- What confidence threshold should decide "ready" versus "needs a look"?
- Is email receipt import technically and legally feasible in all target markets?
- How does the streak handle travel or sick days without punishing users?

**Next steps**

- [ ] Usability test the Home prototype with 5 target users on a timed "get dressed for a client meeting" task
- [ ] Validate the review-by-exception flow with real detection confidence data
- [ ] Extend Wear again into the Calendar screen (reference screen 03)
- [ ] Define the partner-pick relevance rule with the commerce team

## Iteration 2: three focused directions

Version 1 failed on focus: Home tried to do seven jobs at once (decide, swap, plan chips, wear again, closet progress, friends, shopping), so no single action stood out. Iteration 2 explores three directions with stricter rules: [Alta Three Directions](https://claude.ai/artifact/2fqhv1Sfoq5j4JDyAAhAzm).

**Rules**

1. One screen asks one question and offers one obvious action.
2. A first-time viewer knows what to do within 5 seconds.
3. Everything else stays hidden until the moment it is needed.
4. Adding items happens inside the flow, never as a separate chore.

**Directions**

|  | A · One Look | B · Decided Last Night | C · This or That |
| --- | --- | --- | --- |
| Bet | Fewer options decide faster | The morning is the wrong time to decide | A choice between two feels confident |
| Pain | Decision fatigue | Morning rush (Alex, Day 3) | Low confidence; high input effort |
| 5-second read | One outfit, "Wear this" | Notification at night; outfit on lock screen at 7:30 | "Where are you headed today?" with 3 answers |
| Morning decisions | 1 tap | 0 | 2 taps |
| Adding items | One item, when a pick misses ("I own something better") | One gap per evening, while calm | Passive, from a mirror photo after dressing |
| Biggest risk | A wrong single pick erodes trust | Needs notification opt-in; plans change overnight | Slower; camera ask may tire users |
| Build effort | Low | Medium | Medium-high |

**Recommendation.** Lead with B: it removes the decision from the moment users churn, and an evening plan counts toward the north-star directly. Use A's single-look screen as the in-app Home for users who skip the evening plan. Test C's mirror snap separately as the input mechanism.

## Final direction: Alta Tomorrow (B + C)

The final design combines B's context with C's freedom of choice: the decision happens the evening before, shaped by the real calendar, and the user picks between two looks. Prototype: [Alta Tomorrow](https://claude.ai/artifact/8NkG8koDLZDC6mRk42pfXw).

**Why this combination.** B was the strongest bet because it is contextual: it reacts to tomorrow's actual meetings, dinner and weather. On its own, a single locked look can feel like a verdict. C's two-option choice restores a sense of control without reintroducing browsing.

**Flow**

| Step | Time | One question | Answers |
| --- | --- | --- | --- |
| 1. Evening nudge | Wed 21:00 | "Tomorrow: meeting, then dinner. Pick your look." | Tap the notification |
| 2. This or that | Wed 21:01 | "Tomorrow, which one?" with the 3 calendar moments (10:00 meeting, 16:00 rain, 19:30 dinner) | Meeting-first or Meeting to dinner; "Neither, show two more" |
| 3. One gap | Wed 21:01 | "Rain from 16:00. Do you own a raincoat or trench?" | Snap it, or lock as is |
| 4. Locked | Wed 21:02 | "Set for Thursday" | None needed; optional "Change my pick" |
| 5. Morning glance | Thu 07:30 | Lock-screen widget shows the outfit and "umbrella after 16:00" | None: just get dressed |
| 6. Plans changed | Thu 08:05 | "Your 10:00 is now a video call." | Keep my look, or show two relaxed looks |

**Design rules applied**

- Every screen asks one question with at most two answers.
- Each look is labelled by its calendar purpose, so the difference reads in under 5 seconds.
- Adding items is limited to one gap per evening, with a reason the user can see.
- Shopping is left out of the core loop. It can return as a labelled partner suggestion when the user answers "No, I don't own one" to a gap, once the loop is proven.

**New open questions**

- What share of users will grant calendar and notification access, and what is the fallback without them?
- What is the best nudge time, and should users set it?
- How should the flow handle days with no calendar events?

## Design review: six perspectives

The concept is strong, but it rests on two unvalidated assumptions: users will act on a 21:00 nudge, and their calendar reflects what they need to dress for. The next step is to test those cheaply before building.

| Role | Biggest concern | Next action |
| --- | --- | --- |
| User researcher | Evidence is one Reddit thread and a fictional persona. Is 21:00 actually calm for parents and late workers? Do personal plans live in the work calendar? | 1-week diary study of how 10–12 target users decide what to wear. 5-second and first-click tests on each screen. |
| PM | Cold start: a new user with 15 items may not have two good looks. Removing shopping lowers revenue in the short term. Unclear what the app shows when opened at noon. | Define the MVP (nudge, this-or-that, set, morning surface). Define fallbacks for no calendar and small closets. Set success criteria before the test. |
| Engineer | A large outfit card is not a standard lock-screen widget: iOS lock-screen widgets are small and monochrome. Detecting calendar changes overnight needs server-side sync. Inferring occasions from event titles may exceed "existing AI capabilities." | Feasibility spike: rich morning notification vs Live Activity; EventKit vs Google/Outlook sync; event classification accuracy. |
| Marketer | The product story changed from "AI closet" to "tomorrow, decided tonight," and positioning has not caught up. The nightly nudge is now the main retention channel. | Test 3 taglines with ads or a fake-door landing page. Plan App Store screenshots around the lock-screen moment. Add a weekly recap ("4 of 5 workdays planned"). |
| Content strategist | The lock screen shows "client meeting" and "Dinner with Sam", a privacy leak in public. Verbs drift between pick, lock and set. Look labels need rules. | Lock-screen copy shows no event names by default. One verb system: Pick tonight, Set, Change. Label rule: purpose, not style, at most 18 characters. Write empty states for days with no events, weekends and travel. |
| Design system | The prototype uses flat-lay illustrations; Alta's brand renders looks on the user's avatar. Six new components have no specs. The flow runs at 21:00 but is designed in light mode. | Rule: avatar in app, flat lay in notifications. Spec the context strip, choice card, gap prompt, confirmation and morning notification. Design dark mode first for the evening flow. Check contrast, Dynamic Type and VoiceOver labels for outfits. |

**Fix now, in the prototype**

- [x] Remove event names from lock-screen surfaces; show "Meeting, then dinner" instead
- [x] Replace the large lock-screen card with a rich morning notification, which iOS supports
- [x] Add a no-calendar fallback: "What's tomorrow?" with three one-tap plans
- [x] Unify verbs to Pick, Set and Change
- [x] Switch the evening screens to dark mode

All five fixes are applied in [Alta Tomorrow](https://claude.ai/artifact/8NkG8koDLZDC6mRk42pfXw), which now has a seventh step, "No calendar." In that fallback, the two looks come from the chosen plan (Office day, Meetings or Day off), not from calendar events.

**Validate before building**

1. **Concierge pilot (2 weeks, about 20 users).** Send two looks each evening by message, built by hand from each user's calendar and closet. Measure reply rate, and whether they wore the pick the next morning.
2. **Feasibility spike (1 sprint).** Morning surface, calendar sync and event classification.
3. **Positioning test.** Three taglines, same audience, compare sign-up intent.

Proceed to build if most pilot users set a look on most workday evenings, and most set looks are actually worn. Exact thresholds to be agreed with the team before the pilot.

## Visual design and motion

We studied 39 reference screens from 19 apps and applied their shared patterns to Alta Tomorrow: dark evening screens with one lime accent, serif headlines for key moments, the outfit as a full-bleed hero, and fast spring motion. Prototype (version 3): [Alta Tomorrow](https://claude.ai/artifact/8NkG8koDLZDC6mRk42pfXw).

**What we took from the references**

| Pattern | References | How Alta uses it |
| --- | --- | --- |
| One accent on ink | Pliability, AllTrails, Drops, Believe | Night surfaces (#0D0E11, #17181D) with lime (#D6F36A) only for the primary action, today's pill and the app icon |
| Serif for moments | Alma, How We Feel, Atoms, Lifesum | Instrument Serif for questions and confirmations ("Pick tomorrow's look", "Set for Thursday."); Inter Tight for times, labels and buttons |
| Content as hero | CREME, AllTrails, Pinterest | Full-bleed outfit cards on a soft studio backdrop; the label sits in a strip under the image so it never covers clothing |
| Big numbers, small labels | AllTrails, Cash App, Chime | Time tiles: 10:00 Meeting, 16:00 Rain, 19:30 Dinner |
| Visible weekly progress | Pushr, Pliability | Weekday pills on the Set screen; Thursday springs to lime |
| Large radius, pill buttons | Alma, Lifesum, Runbuds | 28px cards, full-width pill CTAs, quiet text secondary actions |
| Light morning, dark evening | Pliability (dark), Alma (light) | Evening screens are dark; the 7:30 lock screen uses a warm dawn wallpaper |

**Motion system**

| Moment | Motion | Timing |
| --- | --- | --- |
| Notification arrives | Drops in with a small bounce; a second card peeks behind | 600ms spring |
| Open from lock screen | App zooms out of the notification | 480ms spring |
| Screen content | Header, tiles and cards rise in with a 60ms stagger | 460ms spring |
| Pick a look | Chosen card grows with a lime ring; the other drops away | 260ms, then next screen |
| Show two more | Pair flicks out left; new pair slides in from the right | 220ms out, 460ms in |
| Set | Check pops and draws, confetti burst, Thursday pill fills | 550ms + 350ms |
| Snap a photo | Flash; the item drops into the closet | 450ms |
| Every tap | Press to 97% | 140ms |

Easing: spring cubic-bezier(.2,.9,.25,1.12) for entrances and ease-out cubic-bezier(.2,.8,.2,1) for exits. All motion turns off when the device requests reduced motion. The prototype has a "Replay motion" button for reviewers.

**Refinement: urban-chic (version 5).** Feedback said the screens felt cramped, used too many type styles, and should feel like a polished city professional's wardrobe. An audit found 17 font sizes across 3 families.

| Area | Before | After |
| --- | --- | --- |
| Typefaces | Instrument Serif, Inter Tight, Geist Mono | Bodoni Moda (Didone, fashion-editorial) + Jost (geometric sans) |
| Type styles | 17 sizes | 4: Display 32, Title 16/500, Body 14, Caption 11 caps |
| Palette | Ink with sporty lime | Espresso #0F0E0D, ivory #F4EFE7, one champagne accent #D8C29E |
| Spacing | Ad hoc, 14–18px margins | 8pt grid: 24px margins, 24px between blocks |
| Plan context | Three time tiles | One quiet line: "10:00 Meeting · 16:00 Rain, 12° · 19:30 Dinner" |
| Look labels | Dark panel with three text styles | Name and purpose set beneath the image, boutique-style |
| Set screen | Large check, week card | Smaller ivory check, a light row of weekday dots |

## Process log

| Step | What happened | Output |
| --- | --- | --- |
| 1. Setup | Session scoped: no memory used; no Whales connector was loaded | Clean working context |
| 2. Brief intake | Read the 4-page challenge PDF and the 3 reference screens | Constraints, requirements, north-star |
| 3. Context download | Users, pain point, competitors, business model, core tension | Context section |
| 4. Golden flow | Mapped the 8-step happy path; identified steps 3–6 as the core loop | Golden flow section |
| 5. Screen choice | Chose Home (primary) and Add items (secondary); Calendar deferred, its retrieval job moved onto Home | Problem framing |
| 6. Diagnosis | Audited both original screens issue by issue against the north-star | Issue tables |
| 7. Principles | Set 6 principles from first principles: be faster than the user's habit | Principles and trade-offs |
| 8. Prototype | Built a 9-step interactive prototype with a Redesign/Original toggle and per-step rationale; tested the full flow in a browser | [Alta Today Redesign](https://claude.ai/artifact/EKxx71FKwxKvTua2LUUUaL) |
| 9. Business case | Tied each change to the north-star; defined metrics, guardrails and an A/B test | Business thinking |
| 10. Export | Conversation exported as JSON in consumer-case-study-alta-90min.zip | Archive file |

Iteration 2 (after feedback that v1 lacked focus): explored three directions under a 5-second rule, built an interactive comparison, and recommended Direction B.

Final direction (after feedback that B was strongest for its calendar context and C for its two-option freedom): combined B + C into Alta Tomorrow, built a 6-step interactive prototype, and updated the summary.

Design review: critiqued Alta Tomorrow from six roles (research, PM, engineering, marketing, content, design system). Listed five prototype fixes and a validation plan led by a 2-week concierge pilot.

Review fixes: applied all five prototype fixes to Alta Tomorrow (privacy-safe lock-screen copy, rich morning notification, no-calendar fallback, Pick/Set/Change verbs, dark evening screens).

Visual design: studied 39 reference screens (two zip files), defined a visual language and motion system, and restyled Alta Tomorrow (version 3) with spring transitions, a set-screen celebration and a Replay motion control.

Product photos (version 4): replaced the vector illustrations with 11 product photos (blazer, raincoat, hoodie, tank, tee, wide trousers, jeans, skirt, ankle boots, tote, sunglasses). Rebuilt every outfit from this wardrobe and laid each look out as a three-column flat lay, with photo backgrounds blended into the studio card.

Urban-chic refinement (version 5): cut type from 17 sizes in 3 families to 4 styles in 2 (Bodoni Moda, Jost), replaced lime with espresso, ivory and champagne, moved to an 8pt grid with 24px margins, and simplified the pick and set screens.

Polish (version 6): switched to Cormorant Garamond 36/500 + Manrope (still four styles). Rebuilt the camera view with concentric radii (screen 46, 12px margin, viewfinder 34, brackets inset 24 with 10px corners), even 24/32px vertical spacing, and a softer scan: corner brackets lock on, a light sheen passes, then a "Raincoat detected" pill. Replaced the line-drawn rain on the gap screen with the supplied rain-on-glass photo, with a slow 16-second drift.

Lookbook pick screen (version 7): replaced the two stacked landscape cards with a side-by-side face-off. Two tall portrait cards stack each look in wearing order (outerwear and top, bottom, then bag and shoes), with an italic "or" between them. Plan context became caption chips; each look shows purpose, name and one line of reason; "Show two more" became an outline pill. Motion now drops the pair away and rises a new pair in.

Fixes and on-model looks (versions 8–9): centred the "or" badge exactly (the entrance animation had reset its centring transform, leaving it 16px off on both axes) and restyled it as an ivory chip with a background-coloured ring. Moved the inner top out from behind the blazer, where the black tank and black blazer merged into one shape, into the bottom row with the bag and shoes. Raised header top padding from 24px to 40px. The two default looks now show full-length model photos instead of flat lays; later pairs keep the flat-lay layout.

Version 10: reverted the default looks from model photos back to flat lays, which read better in the lookbook layout. Restyled the "or" badge with a 1px hairline border and a soft two-layer shadow, so it floats over the gap instead of using a heavy ring.

Versions 11–12: tightened the pick screen header in two passes so date, headline and plan chips read as one group. Final spacing: 2px date to headline (headline line height 1.0) and 14px headline to chips, with 40px of top padding kept.
