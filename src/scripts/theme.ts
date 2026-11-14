const STORAGE_KEY = 'workouts-theme'; // keep in sync with theme-init.js
const root = document.documentElement;
const systemDark = matchMedia('(prefers-color-scheme: dark)');

export const isDark = (): boolean => (root.dataset.theme ? root.dataset.theme === 'dark' : systemDark.matches);

export function toggleTheme(): void {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Private mode: keep the choice for this visit only.
  }
}

/** Fires whenever the effective theme changes (toggle button or OS setting). */
export function onThemeChange(callback: () => void): void {
  new MutationObserver(callback).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  systemDark.addEventListener('change', callback);
}

export const cssColor = (name: string): string => getComputedStyle(root).getPropertyValue(name).trim();
