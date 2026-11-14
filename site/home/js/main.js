import { h } from '/shared/js/dom.js';
import { isDark, onThemeChange, toggleTheme } from '/shared/js/theme.js';
import { sections } from './sections.js';

function renderTile(section) {
  const live = section.status === 'live';
  const content = [
    h('img', { class: 'tile__img', src: section.image, alt: '', width: 640, height: 400, loading: 'lazy' }),
    h('div', { class: 'tile__body' },
      h('h2', { class: 'tile__title' }, section.title),
      h('p', { class: 'tile__blurb' }, section.blurb),
      live
        ? h('span', { class: 'tile__cta' }, 'Open guide →')
        : h('span', { class: 'tile__badge' }, 'Coming soon')),
  ];
  const tile = live
    ? h('a', { class: 'tile', href: section.href, dataset: { accent: section.accent } }, content)
    : h('div', { class: 'tile is-soon', dataset: { accent: section.accent } }, content);
  return h('li', {}, tile);
}

document.getElementById('sections').append(...sections.map(renderTile));

const themeButton = document.getElementById('theme');
const syncTheme = () => themeButton.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
themeButton.addEventListener('click', toggleTheme);
onThemeChange(syncTheme);
syncTheme();
