import { h } from '/shared/js/dom.js';
import { mountChrome } from '../layout.js';
import { sessionOverview, warmupOverview, sessions } from '../ui/render.js';

mountChrome('weekly-plan');

// An example week only. Wednesday and Friday are rest days in the five-day paired strength split and are 48 hours apart.
const noJumps = day => ({ day, kind: 'rest', title: 'No jumps', note: 'Strength training or rest.' });
const week = [
  noJumps('Monday'),
  noJumps('Tuesday'),
  { day: 'Wednesday', kind: 'a', title: 'Session A', note: 'Vertical power. 30–40 min.' },
  noJumps('Thursday'),
  { day: 'Friday', kind: 'b', title: 'Session B', note: 'Lateral control. 30–40 min.' },
  noJumps('Saturday'),
  noJumps('Sunday'),
];

document.getElementById('week').replaceChildren(...week.map(entry =>
  h('li', {}, h('div', { class: 'day', 'data-kind': entry.kind },
    h('span', { class: 'day__name' }, entry.day),
    h('h3', {}, entry.title),
    h('p', {}, entry.note)))));

document.getElementById('sessions').replaceChildren(warmupOverview(), ...sessions.map(sessionOverview));
