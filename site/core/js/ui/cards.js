import { h } from '/shared/js/dom.js';

const sentence = text => text.charAt(0).toUpperCase() + text.slice(1);

/** The "when to do what" roadmap: one step per phase. */
export function renderPlan(phases) {
  return phases.map(phase =>
    h('li', { class: 'plan__step', dataset: { phase: phase.number } },
      h('div', { class: 'plan__head' },
        h('span', { class: 'plan__num', 'aria-hidden': 'true' }, String(phase.number)),
        h('div', {},
          h('h3', { class: 'plan__title' }, phase.title),
          phase.duration && h('p', { class: 'plan__time' }, phase.duration))),
      h('dl', { class: 'plan__details' },
        h('dt', {}, 'Move on when'), h('dd', {}, phase.moveOn),
        h('dt', {}, 'What you do'), h('dd', {}, phase.plan))));
}

export function renderPhase(phase, exercises) {
  const titleId = `phase-${phase.number}-title`;
  const cards = exercises.map((exercise, i) => renderCard(exercise, i, exercises.length));
  const section = h('section', {
    class: 'phase',
    id: `phase-${phase.number}`,
    dataset: { phase: phase.number },
    'aria-labelledby': titleId,
  },
  h('header', { class: 'phase__head' },
    h('span', { class: 'phase__num', 'aria-hidden': 'true' }, String(phase.number)),
    h('div', {},
      h('h2', { id: titleId }, `Phase ${phase.number}: ${phase.title.toLowerCase()}`),
      phase.intro && h('p', { class: 'phase__intro' }, phase.intro))),
  h('div', { class: 'phase__cards' }, cards.map(c => c.el)));
  return { section, cards };
}

function renderCard(exercise, index, total) {
  const canvas = h('canvas', {
    class: 'stage__canvas',
    role: 'img',
    tabindex: '0',
    'aria-label': `${exercise.name}, 3D animation. Drag sideways or use the left and right arrow keys to rotate.`,
  });
  const stage = h('div', { class: 'stage' },
    canvas,
    h('p', { class: 'stage__fallback' }, '3D preview unavailable. The instructions still apply.'),
    h('span', { class: 'stage__badge' }, `Phase ${exercise.phase} · ${index + 1}/${total}`),
    h('span', { class: 'stage__hint', 'aria-hidden': 'true' }, 'Drag to rotate'));

  const body = h('div', { class: 'card__body' },
    h('h3', { class: 'card__title' }, exercise.name),
    h('div', { class: 'card__facts' },
      h('p', { class: 'dose' }, h('span', { class: 'tag' }, 'Dose'), exercise.dose),
      h('p', { class: 'works' }, h('span', { class: 'tag' }, 'Works'), h('span', { class: 'mus' }, exercise.muscles)),
      h('p', { class: 'avoid' }, h('span', { class: 'tag' }, 'Common mistakes'), sentence(exercise.mistakes))),
    h('ol', { class: 'steps' }, exercise.steps.map(step => h('li', {}, step))));

  const el = h('article', { class: 'card', id: exercise.id }, stage, body);
  return { el, canvas, stage, exercise };
}
