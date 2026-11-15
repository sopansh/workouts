---
name: sport-power-profiles
description: Builds sport-specific power, core and rotational training for cricket, badminton, squash and football by analysing the sport's movement demands, then turning each demand into progressions and page content for workouts.theroningamer.com. Use when asked to improve power, rotation or core for a sport, or to plan a sport page.
---

# Sport power profiles

Training for a sport starts from what the sport asks of the body. Everything below is a **hypothesis to verify**: do not write a sport claim until a source is found, read and graded (`evidence-and-sources`).

## Demand analysis template

For each sport fill this in before planning anything.

| Demand | Questions |
|---|---|
| Movement patterns | Sprint and acceleration, change of direction, lunge or split stance, jump, overhead or throwing, rotation |
| Power expression | Which actions need force fast, in what direction and how often |
| Rotation and trunk | Where rotation starts, what resists it, which side dominates |
| Load and volume | Repeats per session, season calendar, surface |
| Common injury sites | See `sports-injury-prevention` |
| Level | Recreational, club, elite: sets the entry gate |

## Starting profiles (to verify, not facts)

- **Cricket.** Fast bowling: ground reaction forces, a rigid front leg, trunk rotation and lateral flexion under high repeated load; throwing from the outfield; batting rotation and sprint between wickets. The strength-side cricket pages live in `src/content/cricket/` (owned by `strength-coach`); coordinate through the executive so the pages link and do not repeat each other. A fast-bowler claim already exists on the site (stress fracture and soft-tissue injury rates in young bowlers); reuse it.
- **Badminton.** Repeated lunges and split-stance recovery, quick direction changes, jumps for smashes, overhead striking with shoulder and trunk rotation, rapid wrist and forearm work.
- **Squash.** Deep repeated lunges, rapid change of direction in a small court, low stance, rotation to strike on both sides.
- **Football.** Sprinting, deceleration, changes of direction, kicking, jumping and landing, contact.

## From demand to training

For each sport produce the same four pieces, using progressions from `plyometric-programming`:

1. **Strength base:** the squat, hinge, single-leg and trunk work the sport needs (hand the strength detail to `strength-coach` through the executive).
2. **Power:** jumps, hops and medicine-ball or bodyweight throws matched to the sport's direction of force. Landing mechanics before repeated jumping.
3. **Rotation and core:** anti-rotation and anti-lateral work first, then rotational power with a gate. Respect the back-safe approach already on the site.
4. **Prehab and prevention:** one short block per injury site, written through `sports-injury-prevention`.

Specify frequency and placement around the sport's season and match days, and keep total weekly load conservative. In-season, power work is short and early in the week, and never the day before a match.

## Entry levels

- **Recreational:** foundations of landing, calves, balance and basic strength. No box or rebound work until gated.
- **Club or competitive:** add single-leg and multi-directional work, rotational power and sport drills. Gated by passing the strength and landing checks.
- **Elite:** out of scope for the site. Point to a qualified coach.

## Page structure (propose the route first)

Suggest the route to the executive before building, for example `src/pages/plyometrics/sports/<sport>/`. Each sport page: demands, the four pieces above, a week layout, gates, red flags, graded evidence with gaps, and links to the exercise cards. Use the shared guide collections and components.

## Research queue

Search Europe PMC for: power or plyometric training in each sport, rotational power and medicine-ball training, deceleration and change-of-direction training, and sport-specific movement analyses. Prefer systematic reviews, then trials, and record the population and level studied.
