/*
 * Runs synchronously in <head>, before first paint, so a saved theme applies without a
 * light/dark flash. Keep it tiny and dependency-free; theme.ts owns the rest of the logic.
 */
try {
  var saved = localStorage.getItem('workouts-theme');
  if (saved) document.documentElement.dataset.theme = saved;
} catch (e) { /* storage blocked: fall back to the OS setting */ }
