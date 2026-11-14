/**
 * Minimal element builder. Builds real DOM nodes (never innerHTML), so content from the
 * data files is always treated as text.
 *
 *   h('a', { class: 'x', href: '#y', dataset: { phase: 1 }, onClick: fn }, 'label', child)
 */
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) continue;
    if (key === 'class') el.className = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), value);
    else el.setAttribute(key, value === true ? '' : value);
  }
  el.append(...children.flat(Infinity).filter(c => c != null && c !== false));
  return el;
}
