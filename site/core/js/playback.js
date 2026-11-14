/** Shared animation clock: one pause state and speed for every figure on the page. */
export class Playback {
  constructor({ paused = false, speed = 1 } = {}) {
    this.paused = paused;
    this.speed = speed;
    this.time = 0;
    this.listeners = [];
  }

  tick(dt) {
    if (!this.paused) this.time += dt * this.speed;
  }

  setPaused(paused) {
    this.paused = paused;
    this.emit();
  }

  setSpeed(speed) {
    this.speed = speed;
    this.emit();
  }

  onChange(listener) {
    this.listeners.push(listener);
  }

  emit() {
    this.listeners.forEach(listener => listener(this));
  }
}
