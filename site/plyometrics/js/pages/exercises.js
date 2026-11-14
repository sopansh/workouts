import { h } from '/shared/js/dom.js';
import { mountChrome } from '../layout.js';
import { exercises } from '../data/exercises.js';
import { exerciseCard } from '../ui/render.js';

mountChrome('exercises');

const groups = [
  { category: 'warmup', title: 'Warm-up' },
  { category: 'power', title: 'Jumps' },
  { category: 'calf', title: 'Calf work' },
  { category: 'balance', title: 'Balance' },
];

const root = document.getElementById('exercise-groups');
root.replaceChildren(...groups.map(group => {
  const items = exercises.filter(exercise => exercise.category === group.category);
  return h('section', { 'aria-labelledby': `group-${group.category}` },
    h('h2', { id: `group-${group.category}`, class: 'group-title' }, group.title),
    h('div', { class: 'cards' }, items.map(exercise => exerciseCard(exercise))));
}));

document.getElementById('exercise-index').replaceChildren(...exercises.map(exercise =>
  h('a', { href: `#${exercise.id}` }, exercise.name)));

// Landing on #id from another page happens before the cards exist, so scroll once they are rendered.
if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
