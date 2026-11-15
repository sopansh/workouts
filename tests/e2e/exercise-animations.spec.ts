import { readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { expect, test } from './fixtures';
import type { Locator } from '@playwright/test';

const entries = readdirSync('src/content/animations')
  .filter(name => name.endsWith('.yml'))
  .sort()
  .flatMap(group => parse(readFileSync(`src/content/animations/${group}`, 'utf8')) as Array<{ id: string; description: string; motion?: 'move' | 'hold' }>);
const snapshot = (canvas: Locator) => canvas.evaluate((el: HTMLCanvasElement) => el.toDataURL());
const pixels = (canvas: Locator) => canvas.evaluate((el: HTMLCanvasElement) => {
  const data = el.getContext('2d')?.getImageData(0, 0, el.width, el.height).data;
  return data?.filter((n, i) => i % 4 === 3 && n > 0).length ?? 0;
});

for (const entry of entries) {
  test(`${entry.id} draws and animates its own reference`, async ({ page }) => {
    await page.goto(`/strength/exercises/${entry.id}/`);
    const wrapper = page.locator(`[data-exercise-animation="${entry.id}"]`);
    await expect(page.locator('[data-exercise-animation]')).toHaveCount(1);
    await expect(wrapper).toContainText('Draft · approximate reference');
    const canvas = wrapper.locator('canvas');
    await expect(canvas).toHaveAttribute('aria-label', new RegExp(entry.description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await canvas.scrollIntoViewIfNeeded();
    await expect.poll(() => pixels(canvas)).toBeGreaterThan(500);
    const before = await snapshot(canvas);
    if (entry.motion === 'hold') {
      await page.waitForTimeout(300);
      expect(await snapshot(canvas)).toBe(before);
      await canvas.focus();
      await page.keyboard.press('ArrowRight');
      await expect.poll(() => snapshot(canvas)).not.toBe(before);
      await page.keyboard.press('Home');
      await expect.poll(() => snapshot(canvas)).toBe(before);
    } else {
      await expect.poll(() => snapshot(canvas), { timeout: 7000 }).not.toBe(before);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('representative exercise keyboard rotation, reset, pause, resume and speed', async ({ page }) => {
  for (const id of ['dumbbell-fly', 'seated-leg-curl', 'hip-abduction-machine']) {
    await page.goto(`/strength/exercises/${id}/`);
    const canvas = page.locator('[data-exercise-animation] canvas');
    await canvas.scrollIntoViewIfNeeded();
    await expect.poll(() => pixels(canvas)).toBeGreaterThan(500);
    await page.locator('#pp').click();
    await expect(page.locator('#pp')).toHaveAttribute('aria-pressed', 'true');
    await canvas.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    const still = await snapshot(canvas);
    await page.waitForTimeout(250);
    expect(await snapshot(canvas)).toBe(still);
    await canvas.focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => snapshot(canvas)).not.toBe(still);
    await page.keyboard.press('Home');
    await expect.poll(() => snapshot(canvas)).toBe(still);
    await page.locator('#speed').click();
    await expect(page.locator('#speed')).toHaveText('Speed 0.5×');
    await page.locator('#pp').click();
    await canvas.scrollIntoViewIfNeeded();
    await expect.poll(() => snapshot(canvas), { timeout: 7000 }).not.toBe(still);
  }
});

test('reduced motion starts still and responds to a live preference change', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/strength/exercises/walking-lunge/');
  const canvas = page.locator('[data-exercise-animation] canvas');
  await canvas.scrollIntoViewIfNeeded();
  await expect.poll(() => pixels(canvas)).toBeGreaterThan(500);
  await expect(page.locator('#pp')).toHaveAttribute('aria-pressed', 'true');
  const still = await snapshot(canvas);
  await page.waitForTimeout(300);
  expect(await snapshot(canvas)).toBe(still);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#pp').click();
  await canvas.scrollIntoViewIfNeeded();
  await expect.poll(() => snapshot(canvas), { timeout: 7000 }).not.toBe(still);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#pp')).toHaveAttribute('aria-pressed', 'true');
});

test('an unanimated guide page does not load illustration assets', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/getting-started/');
  await expect(page.locator('[data-exercise-animation], #pp, #speed')).toHaveCount(0);
  expect(requests.some(url => /three\.min\.js|animation-preview|exercise-figure/.test(url))).toBe(false);
});

test('a failed CDN load leaves a readable visible fallback', async ({ page, problems }) => {
  await page.route('**/three.min.js', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  await page.goto('/strength/exercises/leg-extension/');
  await expect(page.locator('.animation-preview__fallback')).toBeVisible();
  await expect(page.locator('canvas')).not.toBeVisible();
  await expect(page.locator('#how')).toBeVisible();
  expect(problems).toEqual([expect.stringContaining('Failed to find a valid digest')]);
  problems.length = 0;
});

test('multiple preview canvases share one WebGL renderer', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    const canvases = new Set<HTMLCanvasElement>();
    Object.defineProperty(window, 'illustrationContexts', { get: () => canvases.size });
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: function(this: HTMLCanvasElement, type: string, ...args: unknown[]) {
        if (type.startsWith('webgl')) canvases.add(this);
        return Reflect.apply(original, this, [type, ...args]);
      },
    });
  });
  await page.goto('/strength/animation-preview/');
  const canvases = page.locator('[data-exercise-animation] canvas');
  await expect(canvases).toHaveCount(2);
  for (const canvas of await canvases.all()) {
    await canvas.scrollIntoViewIfNeeded();
    await expect.poll(() => pixels(canvas)).toBeGreaterThan(500);
  }
  expect(await page.evaluate(() => Reflect.get(window, 'illustrationContexts'))).toBe(1);
});
