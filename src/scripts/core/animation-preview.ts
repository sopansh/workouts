import { cssColor, onThemeChange } from '../theme';
import { THREE } from './three.js';
import { Playback } from './playback.js';
import { bindToolbar, enableRotation } from './ui/controls.js';
import { ExerciseFigure } from './exercise-figure';
import { validateAnimation, type AnimationConfig } from './exercise-math';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const playback = new Playback({ paused: reducedMotion });
const entries = [...document.querySelectorAll<HTMLElement>('[data-exercise-animation]')];
const errorMessage = 'Animation preview unavailable. The written exercise guidance remains available.';

bindToolbar(playback);

function showError(error?: unknown) {
  document.documentElement.classList.add('no-3d');
  const reason = error instanceof Error ? ` ${error.message}` : '';
  for (const entry of entries) {
    const message = entry.querySelector<HTMLElement>('.animation-preview__fallback');
    if (message) message.textContent = errorMessage + reason;
  }
}

if (!THREE || !entries.length) {
  showError(new Error(!THREE ? 'Three.js did not load.' : 'No movement illustrations found.'));
} else {
  startPreview().catch(error => showError(error));
}

async function startPreview() {
  const { Stage } = await import('./stage.js');
  const stage = new Stage();
  stage.renderer.domElement.addEventListener('webglcontextlost', () => showError(new Error('The 3D context was lost.')));
  const items = entries.map(entry => {
    const config = JSON.parse(entry.dataset.animationConfig ?? 'null') as AnimationConfig;
    validateAnimation(config);
    const canvas = entry.querySelector<HTMLCanvasElement>('canvas');
    const stageElement = entry.querySelector<HTMLElement>('.animation-preview__stage');
    if (!canvas || !stageElement) throw new Error('Prototype page is missing its canvas or stage.');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('The browser could not create a 2D preview canvas.');
    const figure = new ExerciseFigure(config);
    stage.attach(figure);
    enableRotation(canvas, stageElement, figure);
    return {
      figure,
      canvas,
      context,
      visible: false,
    };
  });
  const byCanvas = new Map(items.map(item => [item.canvas, item]));

  const applyTheme = () => {
    stage.setFloorColor(cssColor('--stage-floor'));
    for (const { figure } of items) {
      figure.setPalette(cssColor('--p1'), cssColor('--mut'), cssColor('--surface-2'));
    }
  };
  applyTheme();
  onThemeChange(applyTheme);
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => {
    if (event.matches) playback.setPaused(true);
  });

  playback.onChange(() => {
    for (const { figure, canvas, context } of items) {
      if (!playback.paused) figure.frozen = false;
      figure.dirty = true;
      if (playback.paused) {
        figure.update(playback.time);
        stage.render(figure, canvas, context);
        figure.dirty = false;
      }
    }
  });

  const resizeObserver = new ResizeObserver(changes => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    for (const change of changes) {
      const item = byCanvas.get(change.target as HTMLCanvasElement);
      if (!item) continue;
      item.canvas.width = Math.round(change.contentRect.width * ratio);
      item.canvas.height = Math.round(change.contentRect.height * ratio);
      item.figure.dirty = true;
    }
  });
  items.forEach(item => resizeObserver.observe(item.canvas));

  const viewport = new IntersectionObserver(changes => {
    for (const change of changes) {
      const item = byCanvas.get(change.target as HTMLCanvasElement);
      if (item) item.visible = change.isIntersecting;
    }
  }, { rootMargin: '100px' });
  items.forEach(item => viewport.observe(item.canvas));

  let previous = performance.now();
  const frame = (now: number) => {
    playback.tick(Math.min((now - previous) / 1000, 0.1));
    previous = now;
    for (const item of items) {
      if (!item.context || !item.visible || (playback.paused && !item.figure.dirty)) continue;
      item.figure.update(playback.time);
      stage.render(item.figure, item.canvas, item.context);
      item.figure.dirty = false;
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
