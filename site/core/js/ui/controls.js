const SPEEDS = [1, 0.5];
const DRAG_RADIANS_PER_PX = 0.012;
const KEY_STEP = 0.15;

/** Wire the pause, speed and theme buttons in the sticky toolbar. */
export function bindToolbar(playback, toggleTheme, isDark) {
  const pause = document.getElementById('pp');
  const speed = document.getElementById('speed');
  const theme = document.getElementById('theme');

  const sync = () => {
    pause.querySelector('.label').textContent = playback.paused ? 'Resume animations' : 'Pause animations';
    pause.querySelector('.icon').textContent = playback.paused ? '▶' : '❚❚';
    pause.setAttribute('aria-pressed', String(playback.paused));
    speed.querySelector('.label').textContent = `Speed ${playback.speed}×`;
    theme.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
  };

  pause.addEventListener('click', () => playback.setPaused(!playback.paused));
  speed.addEventListener('click', () => {
    playback.setSpeed(SPEEDS[(SPEEDS.indexOf(playback.speed) + 1) % SPEEDS.length]);
  });
  theme.addEventListener('click', () => { toggleTheme(); sync(); });
  playback.onChange(sync);
  sync();
  return sync;
}

/** Drag, arrow keys and double-click to turn a figure and see it from front or back. */
export function enableRotation(canvas, stage, figure) {
  let lastX = null;
  const touched = () => stage.classList.add('is-touched');

  canvas.addEventListener('pointerdown', e => {
    lastX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
    stage.classList.add('is-dragging');
    touched();
  });
  canvas.addEventListener('pointermove', e => {
    if (lastX === null) return;
    figure.rotate((e.clientX - lastX) * DRAG_RADIANS_PER_PX);
    lastX = e.clientX;
  });
  for (const type of ['pointerup', 'pointercancel']) {
    canvas.addEventListener(type, () => {
      lastX = null;
      stage.classList.remove('is-dragging');
    });
  }
  canvas.addEventListener('dblclick', () => figure.resetView());
  canvas.addEventListener('keydown', e => {
    const step = { ArrowLeft: -KEY_STEP, ArrowRight: KEY_STEP }[e.key];
    if (step !== undefined) {
      e.preventDefault();
      figure.rotate(step);
      touched();
    } else if (e.key === 'Home') {
      figure.resetView();
    }
  });
}
