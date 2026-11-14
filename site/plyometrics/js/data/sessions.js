/**
 * The two repeating sessions. Each lists exercise ids in the order they are performed.
 * `warmup` is shared by both sessions and rendered once at the top of each session card list.
 */
export const warmup = ['march-ankle-circles', 'squat-to-calf-raise'];

export const sessions = [
  {
    id: 'session-a',
    title: 'Session A: vertical power',
    accent: 'p3',
    intro: 'The main vertical jump, plus the shared ankle, calf and balance work.',
    exercises: ['ankle-hop', 'vertical-jump-stick', 'standing-calf-raise', 'bent-knee-calf-raise', 'single-leg-balance'],
  },
  {
    id: 'session-b',
    title: 'Session B: lateral control',
    accent: 'p2',
    intro: 'The cone-marked side-to-side hop, plus the same shared ankle, calf and balance work.',
    exercises: ['ankle-hop', 'lateral-hop', 'standing-calf-raise', 'bent-knee-calf-raise', 'single-leg-balance'],
  },
];
