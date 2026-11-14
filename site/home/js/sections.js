/**
 * The sections shown on the home page. To add one, append an entry: the grid reflows itself.
 *
 *  title   shown on the tile
 *  blurb   one-sentence description
 *  image   any file under /assets/img/ (SVG, JPG, PNG, WebP). Swap for a photo any time.
 *  accent  colour token that tints the tile: 'p1' | 'p2' | 'p3' | 'p4' (see shared/styles/tokens.css)
 *  status  'live' -> the tile links to `href`
 *          'soon' -> shown as "Coming soon", not a link
 */
export const sections = [
  {
    id: 'strength',
    title: 'Strength / Hypertrophy',
    blurb: 'Build muscle and strength, muscle group by muscle group, with the exercise variations that target each one.',
    image: '/assets/img/strength.svg',
    accent: 'p2',
    status: 'live',
    href: '/strength/',
  },
  {
    id: 'plyometrics',
    title: 'Plyometrics',
    blurb: 'A basic, repeatable two-session jump plan with calf and ankle work. A draft for later, once cleared to jump.',
    image: '/assets/img/plyometrics.svg',
    accent: 'p3',
    status: 'live',
    href: '/plyometrics/',
  },
  {
    id: 'isometrics',
    title: 'Isometrics (Core)',
    blurb: 'A back-safe core, glute and power guide with looping 3D exercise demos.',
    image: '/assets/img/isometrics.svg',
    accent: 'p1',
    status: 'live',
    href: '/core/',
  },
  {
    id: 'nutrition',
    title: 'Health & Nutrition',
    blurb: 'Fuel, recovery and the habits that make training work.',
    image: '/assets/img/nutrition.svg',
    accent: 'p4',
    status: 'soon',
  },
];
