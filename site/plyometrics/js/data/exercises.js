/**
 * Exercise catalogue — the single source of truth for every card on the page.
 *
 * category: 'warmup' | 'power' | 'calf' | 'balance'.
 * progression: for the two load-bearing jumps only. An array of { weeks, sets, reps } that drives
 *   both the inline dose shown on the card and the shared progression table. Fixed-dose exercises
 *   (calf raises, balance) use `dose` instead and are not progressed; repetition, not escalation,
 *   is the point of this plan.
 * painRule: short, exercise-specific addition to the general jump pain rule in index.html.
 */
export const exercises = [
  {
    id: 'march-ankle-circles',
    name: 'March and ankle circles',
    category: 'warmup',
    muscles: 'General warm-up: hips, ankles',
    dose: '2 minutes',
    setup: 'Clear, stable floor space.',
    steps: [
      'March on the spot, lifting the knees comfortably, for about a minute.',
      'Stand tall and circle each ankle slowly, both directions, about 8 times each.',
    ],
    mistakes: ['rushing through it cold', 'skipping it on a tight schedule'],
    contraindications: ['acute ankle or hip pain that is not yet assessed'],
    regression: 'Seated marching and ankle circles.',
  },
  {
    id: 'squat-to-calf-raise',
    name: 'Squat-to-calf-raise',
    category: 'warmup',
    muscles: 'Quadriceps, glutes, calves (rehearses the landing shape)',
    dose: '3 sets of 4',
    setup: 'Stand with feet shoulder-width apart.',
    steps: [
      'Sit back into a shallow, comfortable squat.',
      'Stand up and rise onto the balls of both feet.',
      'Lower the heels, then return smoothly to standing. No jump; this rehearses the shape only.',
    ],
    mistakes: ['squatting past a depth you control', 'rushing the tempo'],
    contraindications: ['sharp knee or hip pain on squatting'],
    regression: 'Hold a wall or chair with both hands.',
  },
  {
    id: 'ankle-hop',
    name: 'Small two-foot ankle hops',
    category: 'power',
    muscles: 'Calves (gastrocnemius, soleus), foot and ankle connective tissue',
    progression: [
      { weeks: 'Weeks 1–2', sets: 2, reps: 5 },
      { weeks: 'Weeks 3–4', sets: 3, reps: 5 },
      { weeks: 'Weeks 5–8', sets: 3, reps: 6 },
    ],
    setup: 'Stand tall, feet hip-width, on a stable, non-slip floor.',
    steps: [
      'Keeping the knees fairly straight, hop both feet a few centimetres off the floor using mostly the ankles.',
      'Land softly and quietly on the balls of the feet and absorb through the ankles.',
      'Reset fully between hops. This is a stiff, rhythmic bounce, not a big jump.',
    ],
    cues: ['Quiet landings', 'Think "springy ankles", not "big knees"'],
    mistakes: ['landing flat-footed and loud', 'bending deeply at the knees and hips'],
    contraindications: ['Achilles or calf pain that is not yet assessed', 'acute ankle sprain'],
    regression: 'Small heel raises with no air time, or the standing calf raise below.',
  },
  {
    id: 'vertical-jump-stick',
    name: 'Small vertical jump and stick',
    category: 'power',
    muscles: 'Quadriceps, glutes, calves',
    progression: [
      { weeks: 'Weeks 1–2', sets: 2, reps: 4 },
      { weeks: 'Weeks 3–4', sets: 3, reps: 4 },
      { weeks: 'Weeks 5–8', sets: 3, reps: 4 },
    ],
    setup: 'Stand tall with a comfortable, clear landing space.',
    steps: [
      'Dip into the shallow squat used in the warm-up, then jump a small height straight up.',
      'Land on both feet at the same time, knees soft and tracking over the toes.',
      'Stick the landing: hold still for a second before resetting.',
      'Full reset between reps; this is not a continuous bounce.',
    ],
    cues: ['Land as quietly as you took off', 'Stick it: no wobble, no second hop'],
    mistakes: ['jumping for maximum height instead of a clean landing', 'knees caving inward on landing'],
    contraindications: ['current back, hip, knee or ankle pain that is not yet assessed'],
    regression: 'The squat-to-calf-raise above, or a small jump with no air time (just rise onto the toes).',
  },
  {
    id: 'lateral-hop',
    name: 'Small two-foot side-to-side hops',
    category: 'power',
    muscles: 'Adductors and abductors, calves, ankle stabilisers',
    progression: [
      { weeks: 'Weeks 1–2', sets: 2, reps: 4 },
      { weeks: 'Weeks 3–4', sets: 3, reps: 4 },
      { weeks: 'Weeks 5–8', sets: 3, reps: 4 },
    ],
    setup: 'Place two cones about 30–40 cm apart as markers. Stand beside one.',
    steps: [
      'Hop sideways over the gap between the cones, landing on both feet together.',
      'Land softly, pause, then hop back the other way. The cones mark the gap; do not jump over the cones themselves.',
      'Keep the hops small while learning the landing.',
    ],
    cues: ['Soft, controlled landings', 'Keep the hops small to start'],
    mistakes: ['hopping wide before landings feel controlled', 'twisting the knee on landing'],
    contraindications: ['current back, hip, knee or ankle pain that is not yet assessed'],
    regression: 'Step sideways between the cones instead of hopping.',
  },
  {
    id: 'standing-calf-raise',
    name: 'Standing calf raise',
    category: 'calf',
    muscles: 'Gastrocnemius, soleus',
    dose: '2 sets of 10',
    setup: 'Stand tall, holding a wall or chair for balance if needed.',
    steps: ['Rise slowly onto the balls of both feet.', 'Lower under control to a full stretch at the bottom.'],
    mistakes: ['bouncing at the bottom', 'rushing the lowering phase'],
    contraindications: ['acute Achilles or calf pain'],
    regression: 'A shorter range, or one hand firmly on support.',
  },
  {
    id: 'bent-knee-calf-raise',
    name: 'Bent-knee calf raise',
    category: 'calf',
    muscles: 'Soleus (the deeper calf muscle, with the knee bent)',
    dose: '2 sets of 8',
    setup: 'Hold a wall or chair for balance, knees softly bent throughout.',
    steps: ['Keeping the knees bent, rise onto the balls of both feet.', 'Lower slowly and under control.'],
    mistakes: ['straightening the knees partway through', 'losing balance without using the support'],
    contraindications: ['acute Achilles or calf pain'],
    regression: 'A shorter range with both hands on support.',
  },
  {
    id: 'single-leg-balance',
    name: 'Single-leg balance',
    category: 'balance',
    muscles: 'Ankle, knee and hip stabilisers',
    dose: '2 sets of 20 seconds each side',
    setup: 'Stand near a wall or chair in case you need it.',
    steps: ['Stand on one leg, knee soft, gaze on a fixed point ahead.', 'Hold, then switch sides.'],
    mistakes: ['locking the standing knee', 'holding a wall the whole time once it is no longer needed'],
    contraindications: ['dizziness or balance problems that are not yet assessed'],
    regression: 'Hold a wall or chair with one or both hands.',
  },
];

export const exerciseById = new Map(exercises.map(e => [e.id, e]));
