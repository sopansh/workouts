const STORAGE_KEY = 'core-guide-theme';
const root = document.documentElement;
const systemDark = matchMedia('(prefers-color-scheme: dark)');

export const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : systemDark.matches);

export function toggleTheme() {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem(STORAGE_KEY, next); } catch { /* private mode: keep it for this visit only */ }
}

/** Fires whenever the effective theme changes (toggle button or OS setting). */
export function onThemeChange(callback) {
  new MutationObserver(callback).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  systemDark.addEventListener('change', callback);
}

export const cssColor = name => getComputedStyle(root).getPropertyValue(name).trim();
