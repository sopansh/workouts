/** Highlights the sticky section pill whose section is currently in view. Each link carries data-target="<section id>". */
export function watchSections(container) {
  const links = [...container.querySelectorAll('a[data-target]')];
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
