import { h } from '/shared/js/dom.js';
import { exerciseById } from '../data/exercises.js';
import { warmup, sessions } from '../data/sessions.js';
import { claims, sources, gradeLabel } from '../data/evidence.js';

const sentence = text => text.charAt(0).toUpperCase() + text.slice(1);
const times = (sets, reps) => `${sets} × ${reps}`;

/** Foot contacts per session in a progression row: the sum over the session's progressed jumps. */
export function contactsFor(session, index) {
  return session.exercises
    .map(id => exerciseById.get(id).progression?.[index])
    .filter(Boolean)
    .reduce((sum, step) => sum + step.sets * step.reps, 0);
}

export const progressionWeeks = () => exerciseById.get('ankle-hop').progression.map(step => step.weeks);

function doseText(exercise) {
  if (exercise.dose) return exercise.dose;
  const first = exercise.progression[0];
  const last = exercise.progression.at(-1);
  return `${times(first.sets, first.reps)} to start; ${times(last.sets, last.reps)} by ${last.weeks.toLowerCase()}. See progression`;
}

function list(items, ordered = false) {
  return h(ordered ? 'ol' : 'ul', { class: ordered ? 'steps' : 'plain' }, items.map(item => h('li', {}, item)));
}

export function exerciseCard(exercise, { heading = 'h3', id = exercise.id } = {}) {
  return h('article', { class: 'card', id },
    h(heading, { class: 'card__title' }, exercise.name),
    h('p', { class: 'dose' }, h('span', { class: 'tag' }, 'Dose'), doseText(exercise)),
    h('p', { class: 'works' }, h('span', { class: 'tag' }, 'Works'), exercise.muscles),
    h('p', { class: 'setup' }, h('span', { class: 'tag' }, 'Setup'), exercise.setup),
    list(exercise.steps, true),
    exercise.cues && h('p', { class: 'cues' }, h('span', { class: 'tag' }, 'Cues'), exercise.cues.join(' · ')),
    h('div', { class: 'safety-grid' },
      h('div', {}, h('p', { class: 'tag tag--warn' }, 'Common mistakes'), list(exercise.mistakes.map(sentence))),
      h('div', {}, h('p', { class: 'tag tag--warn' }, 'Do not do this if'), list(exercise.contraindications.map(sentence))),
      h('div', {}, h('p', { class: 'tag' }, 'Regression'), h('p', {}, exercise.regression))));
}

export function exerciseLink(id) {
  const exercise = exerciseById.get(id);
  return h('a', { href: `/plyometrics/exercises/#${id}` }, exercise.name);
}

function exerciseRow(id) {
  const exercise = exerciseById.get(id);
  return h('tr', {},
    h('th', { scope: 'row' }, exerciseLink(id)),
    h('td', {}, doseText(exercise)),
    h('td', {}, exercise.muscles));
}

function table(label, headings, rows) {
  return h('div', { class: 'table-wrap', role: 'region', 'aria-label': label, tabindex: '0' },
    h('table', {}, h('caption', { class: 'sr-only' }, label),
      h('thead', {}, h('tr', {}, headings.map(text => h('th', { scope: 'col' }, text)))),
      h('tbody', {}, rows)));
}

export function sessionOverview(session) {
  return h('section', { class: 'session', 'aria-labelledby': `${session.id}-title`, dataset: { accent: session.accent } },
    h('h3', { id: `${session.id}-title` }, session.title),
    h('p', { class: 'muted' }, session.intro),
    table(`${session.title}: exercises`, ['Exercise', 'Starting dose', 'Works'], session.exercises.map(exerciseRow)));
}

export function warmupOverview() {
  return h('section', { class: 'session', 'aria-labelledby': 'warmup-title', dataset: { accent: 'p1' } },
    h('h3', { id: 'warmup-title' }, 'Warm-up for both sessions (about 8 minutes)'),
    h('p', { class: 'muted' }, 'Easy and unhurried. If anything hurts during the warm-up, do not continue to the jumps.'),
    table('Warm-up exercises', ['Exercise', 'Dose', 'Works'], warmup.map(exerciseRow)));
}

export function progressionTable() {
  const weeks = progressionWeeks();
  const jumps = ['ankle-hop', 'vertical-jump-stick', 'lateral-hop'].map(id => exerciseById.get(id));
  return table('Eight-week jump progression', ['Weeks', ...jumps.map(jump => `${jump.name} (sets × reps)`), 'Foot contacts, Session A', 'Foot contacts, Session B'],
    weeks.map((label, index) => h('tr', {},
      h('th', { scope: 'row' }, label),
      jumps.map(jump => h('td', {}, times(jump.progression[index].sets, jump.progression[index].reps))),
      h('td', {}, String(contactsFor(sessions[0], index))),
      h('td', {}, String(contactsFor(sessions[1], index))))));
}

export function evidenceList() {
  const sourceById = new Map(sources.map(source => [source.id, source]));
  return h('ul', { class: 'claims' }, claims.map(claim =>
    h('li', { id: `claim-${claim.id}` },
      h('article', { class: 'claim' },
        h('p', {},
          claim.grade
            ? h('span', { class: 'badge', 'data-grade': claim.grade }, `Grade ${claim.grade}: ${gradeLabel[claim.grade]}`)
            : h('span', { class: 'badge' }, 'Background, not graded')),
        h('p', {}, claim.statement),
        h('p', { class: 'caveat' }, h('b', {}, 'Limits. '), claim.caveats),
        claim.sources.length > 0 && h('p', { class: 'small muted' }, 'Source: ', claim.sources.map((sourceId, i) => {
          const source = sourceById.get(sourceId);
          return [i > 0 && '; ', `${source.cite}. ${source.title}. `, h('i', {}, source.venue), '. ',
            h('a', { href: source.doi ? `https://doi.org/${source.doi}` : source.url, rel: 'noopener' }, source.doi ? `doi:${source.doi}` : 'Link'),
            source.checked && ` (DOI checked on Crossref ${source.checked})`];
        }))))));
}

export function sourceList() {
  return h('ul', { class: 'plain' }, sources.map(source =>
    h('li', { id: `source-${source.id}` }, `${source.cite}. ${source.title}. `, h('i', {}, source.venue), '. ',
      h('a', { href: source.doi ? `https://doi.org/${source.doi}` : source.url, rel: 'noopener' }, source.doi ? `doi:${source.doi}` : source.url))));
}

export { warmup, sessions };
