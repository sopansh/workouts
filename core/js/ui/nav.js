import { h } from './dom.js';

/** Builds the sticky section pills and highlights the one currently in view. */
export function renderNav(container, phases) {
  const links = [
    h('a', { href: '#plan', dataset: { target: 'plan' } }, 'Plan'),
    ...phases.map(p =>
      h('a', { href: `#phase-${p.number}`, dataset: { target: `phase-${p.number}`, phase: p.number } },
        h('span', { class: 'pill__num', 'aria-hidden': 'true' }, String(p.number)), p.title)),
  ];
  container.replaceChildren(...links);

  const byId = new Map(links.map(a => [a.dataset.target, a]));
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(a => a.removeAttribute('aria-current'));
      byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
    }
  }, { rootMargin: '-30% 0px -60% 0px' });
  byId.forEach((_, id) => {
    const target = document.getElementById(id);
    if (target) observer.observe(target);
  });
}
