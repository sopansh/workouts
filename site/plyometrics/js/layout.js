import { h } from '/shared/js/dom.js';
import { isDark, onThemeChange, toggleTheme } from '/shared/js/theme.js';

export const pages = [
  { id: 'overview', label: 'Overview', href: '/plyometrics/' },
  { id: 'weekly-plan', label: 'Weekly plan', href: '/plyometrics/weekly-plan/' },
  { id: 'exercises', label: 'Exercises', href: '/plyometrics/exercises/' },
  { id: 'progression', label: 'Progression', href: '/plyometrics/progression/' },
  { id: 'fascia', label: 'Fascia and tendons', href: '/plyometrics/fascia/' },
];

/** Renders the toolbar, the safety callout (if the page has a #safety slot) and the footer. */
export function mountChrome(current) {
  const themeButton = h('button', { class: 'btn btn--icon', type: 'button', onClick: toggleTheme },
    h('span', { class: 'icon', 'aria-hidden': 'true' }, '◐'));
  const syncTheme = () => themeButton.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
  syncTheme();
  onThemeChange(syncTheme);

  document.getElementById('chrome').replaceChildren(
    h('div', { class: 'wrap toolbar__inner' },
      h('a', { class: 'toolbar__brand', href: '/home/', 'aria-label': 'Back to all workouts' },
        h('span', { 'aria-hidden': 'true' }, '←'), h('span', { class: 'brand-text--wide' }, 'Workouts')),
      h('nav', { class: 'toolbar__nav', 'aria-label': 'Plyometrics sections' },
        pages.map(page => h('a', { href: page.href, 'aria-current': page.id === current ? 'page' : false }, page.label))),
      h('div', { class: 'toolbar__controls' }, themeButton)));

  const safety = document.getElementById('safety');
  if (safety) safety.replaceChildren(safetyNote());

  document.getElementById('footer').replaceChildren(
    h('p', {}, 'Draft: not reviewed by a physiotherapist, doctor or strength and conditioning coach. General education, not medical advice. ',
      'If something hurts, stop and see a qualified professional. ',
      h('a', { href: '/plyometrics/fascia/#evidence' }, 'Sources and evidence grades'), ' · ',
      h('a', { href: '/strength/' }, 'Strength section'), ' · ',
      h('a', { href: '/core/' }, 'Back-safe core guide')));
}

function safetyNote() {
  return h('aside', { class: 'callout', role: 'note' },
    h('span', { class: 'callout__icon', 'aria-hidden': 'true' }, '!'),
    h('div', {},
      h('p', {}, h('b', {}, 'Not for now if your back hurts. '),
        'This plan is written to follow later, once a doctor or physiotherapist has said that jumping is appropriate for you. This is a general training plan, not a back-pain rehabilitation program; use the phases in the back-safe core guide for that.'),
      h('p', {}, h('b', {}, 'Stop and get urgent help '),
        'for new bladder or bowel changes, numbness around the genitals or anus, or weakness or numbness in both legs (', h('a', { href: 'https://www.nhs.uk/conditions/back-pain/', rel: 'noopener' }, 'NHS guidance'), ').'),
      h('p', {}, h('b', {}, 'During any session: '),
        'stay at 2/10 discomfort or lower and no worse the next morning. Stop a set if landings turn loud or uncontrolled, or if anything feels sharp, pinching, or catching in the back, hip, knee, ankle, foot or Achilles.')));
}
