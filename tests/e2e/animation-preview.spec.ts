import { expect, test } from './fixtures';
import type { Locator } from '@playwright/test';

const snapshot = (canvas: Locator) => canvas.evaluate((el: HTMLCanvasElement) => el.toDataURL());
const drawnPixels = (canvas: Locator) => canvas.evaluate((el: HTMLCanvasElement) => {
  const context = el.getContext('2d');
  if (!context) return 0;
  const { data } = context.getImageData(0, 0, el.width, el.height);
  let count = 0;
  for (let index = 3; index < data.length; index += 4) {
    if (data[index] > 0) count++;
  }
  return count;
});

test.describe('strength animation prototype', () => {
  test('draws and animates the bench press and back squat with readable alternatives', async ({ page }) => {
    await page.goto('/strength/animation-preview/');
    for (const movement of ['bench', 'squat']) {
      const card = page.locator(`[data-animation-preview="${movement}"]`);
      const canvas = card.locator('canvas');
      await expect(canvas).toHaveAttribute('aria-label', /approximate draft animation/);
      await canvas.scrollIntoViewIfNeeded();
      await expect.poll(() => drawnPixels(canvas), { message: `${movement} figure drawn` }).toBeGreaterThan(500);
      const before = await snapshot(canvas);
      await expect.poll(() => snapshot(canvas), {
        message: `${movement} animation changes the frame`,
        timeout: 5000,
      }).not.toBe(before);
    }
  });

  test('pause freezes both animations', async ({ page }) => {
    await page.goto('/strength/animation-preview/');
    const bench = page.locator('[data-animation-preview="bench"] canvas');
    const squat = page.locator('[data-animation-preview="squat"] canvas');
    await bench.scrollIntoViewIfNeeded();
    await expect.poll(() => drawnPixels(bench)).toBeGreaterThan(500);
    await squat.scrollIntoViewIfNeeded();
    await expect.poll(() => drawnPixels(squat)).toBeGreaterThan(500);
    const pause = page.locator('#pp');
    await pause.click();
    await expect(pause).toHaveAttribute('aria-pressed', 'true');
    const frozen = [await snapshot(bench), await snapshot(squat)];
    await page.waitForTimeout(600);
    expect([await snapshot(bench), await snapshot(squat)]).toEqual(frozen);

    await pause.click();
    await expect(pause).toHaveAttribute('aria-pressed', 'false');
    await bench.scrollIntoViewIfNeeded();
    await expect.poll(() => snapshot(bench), { timeout: 5000 }).not.toBe(frozen[0]);
  });

  test('speed control cycles between normal and half speed', async ({ page }) => {
    await page.goto('/strength/animation-preview/');
    const speed = page.locator('#speed');
    await expect(speed).toContainText('Speed 1×');
    await speed.click();
    await expect(speed).toContainText('Speed 0.5×');
    await speed.click();
    await expect(speed).toContainText('Speed 1×');
  });

  test('arrow keys rotate the focused figure', async ({ page }) => {
    await page.goto('/strength/animation-preview/');
    const canvas = page.locator('[data-animation-preview="squat"] canvas');
    await canvas.scrollIntoViewIfNeeded();
    await expect.poll(() => drawnPixels(canvas)).toBeGreaterThan(500);
    const pause = page.locator('#pp');
    await pause.click();
    await expect(pause).toHaveAttribute('aria-pressed', 'true');
    await canvas.scrollIntoViewIfNeeded();
    const before = await snapshot(canvas);
    await canvas.focus();
    for (let index = 0; index < 6; index++) await page.keyboard.press('ArrowRight');
    await expect.poll(() => snapshot(canvas)).not.toBe(before);
    await page.keyboard.press('Home');
    await expect.poll(() => snapshot(canvas)).toBe(before);
  });
});

test.describe('strength animation prototype with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('renders a still frame and starts paused', async ({ page }) => {
    await page.goto('/strength/animation-preview/');
    const canvas = page.locator('[data-animation-preview="squat"] canvas');
    await canvas.scrollIntoViewIfNeeded();
    await expect(page.locator('#pp')).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => drawnPixels(canvas)).toBeGreaterThan(500);
    const still = await snapshot(canvas);
    await page.waitForTimeout(600);
    expect(await snapshot(canvas)).toBe(still);
  });
});
