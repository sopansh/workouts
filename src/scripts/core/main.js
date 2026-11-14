import { THREE } from './three.js';
import { Playback } from './playback.js';
import { cssColor, onThemeChange } from '../theme';
import { watchSections } from './ui/nav.js';
import { bindToolbar, enableRotation } from './ui/controls.js';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const playback = new Playback({ paused: reducedMotion });

// Astro renders the whole guide at build time, so it is fully readable before (or without) any 3D.
// Here we only attach the 3D figures and the toolbar behaviour to the cards that are already on the page.
const exercises = JSON.parse(document.getElementById('core-data').textContent);
const cards = exercises.map(exercise => {
  const el = document.getElementById(exercise.id);
  return { exercise, canvas: el.querySelector('canvas'), stage: el.querySelector('.stage') };
});
watchSections(document.getElementById('phase-nav'));
bindToolbar(playback);

if (THREE) {
  start3d().catch(error => {
    console.error(error);
    showFallback();
  });
} else {
  showFallback();
}

function showFallback() {
  document.documentElement.classList.add('no-3d');
}

async function start3d() {
  const [{ Stage }, { Figure }] = await Promise.all([import('./stage.js'), import('./rig/figure.js')]);
  const stage = new Stage();
  const items = cards.map(card => {
    const figure = new Figure(card.exercise);
    figure.frozen = reducedMotion; // a still frame should show the working pose, not the start
    stage.attach(figure);
    enableRotation(card.canvas, card.stage, figure);
    return { figure, canvas: card.canvas, ctx: card.canvas.getContext('2d'), visible: false };
  });
  const byCanvas = new Map(items.map(item => [item.canvas, item]));
  const markAllDirty = () => items.forEach(item => { item.figure.dirty = true; });

  const applyTheme = () => {
    stage.setFloorColor(cssColor('--stage-floor'));
    markAllDirty();
  };
  applyTheme();
  onThemeChange(applyTheme);

  playback.onChange(() => {
    if (!playback.paused) items.forEach(item => { item.figure.frozen = false; });
    markAllDirty();
  });

  // Keep each canvas's backing store matched to its on-screen size (crisp on retina).
  const sizeObserver = new ResizeObserver(entries => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    for (const entry of entries) {
      const item = byCanvas.get(entry.target);
      item.canvas.width = Math.round(entry.contentRect.width * dpr);
      item.canvas.height = Math.round(entry.contentRect.height * dpr);
      item.figure.dirty = true;
    }
  });
  items.forEach(item => sizeObserver.observe(item.canvas));

  // Only animate what is on screen.
  const viewport = new IntersectionObserver(entries => {
    for (const entry of entries) byCanvas.get(entry.target).visible = entry.isIntersecting;
  }, { rootMargin: '100px' });
  items.forEach(item => viewport.observe(item.canvas));

  let last = performance.now();
  const frame = now => {
    playback.tick(Math.min((now - last) / 1000, 0.1));
    last = now;
    for (const item of items) {
      const { figure } = item;
      if (!item.visible || (playback.paused && !figure.dirty)) continue;
      figure.update(playback.time);
      stage.render(figure, item.canvas, item.ctx);
      figure.dirty = false;
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
