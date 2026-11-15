import { expect, test } from './fixtures';
import type { Locator } from '@playwright/test';

const snapshot = (canvas: Locator) => canvas.evaluate((el: HTMLCanvasElement) => el.toDataURL());

/** Count of drawn (non-transparent) pixels, so a blank canvas can be told from a rendered figure. */
const drawnPixels = (canvas: Locator) =>
  canvas.evaluate((el: HTMLCanvasElement) => {
    const context = el.getContext('2d')!;
    const { data } = context.getImageData(0, 0, el.width, el.height);
    let count = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 0) count++;
    return count;
  });

test.describe('core guide', () => {
  test('exercise payload accepts 2D or 3D joint points', async ({ page }) => {
    await page.goto('/core/');
    const arities = await page.evaluate(() => {
      const data = JSON.parse(document.getElementById('core-data')!.textContent ?? '[]');
      return data.flatMap((exercise: { poses: { start: Record<string, number[]>; end: Record<string, number[]> } }) =>
        ['start', 'end'].flatMap((phase: 'start' | 'end') => Object.values(exercise.poses[phase]).map(point => point.length)),
      );
    });
    expect(arities.length).toBeGreaterThan(0);
    for (const arity of arities) expect([2, 3]).toContain(arity);
  });

  test('renders all eight exercise cards with a labelled canvas each', async ({ page }) => {
    await page.goto('/core/');
    await expect(page.locator('article.demo')).toHaveCount(8);
    const labels = await page.locator('canvas.stage__canvas').evaluateAll(els => els.map(el => el.getAttribute('aria-label') ?? ''));
    expect(labels).toHaveLength(8);
    for (const label of labels) expect(label).toMatch(/3D animation/);
  });

  test('the 3D figure is drawn and animates', async ({ page }) => {
    await page.goto('/core/');
    const canvas = page.locator('#mcgill-curl-up canvas');
    await canvas.scrollIntoViewIfNeeded();
    await expect.poll(() => drawnPixels(canvas), { message: 'figure drawn' }).toBeGreaterThan(500);
    const first = await snapshot(canvas);
    await expect.poll(() => snapshot(canvas), { message: 'animation changes the frame', timeout: 5000 }).not.toBe(first);
  });

  test('pause freezes the animation and resume restarts it', async ({ page }) => {
    await page.goto('/core/');
    const canvas = page.locator('#mcgill-curl-up canvas');
    await canvas.scrollIntoViewIfNeeded();
    await expect.poll(() => drawnPixels(canvas)).toBeGreaterThan(500);

    const pause = page.locator('#pp');
    await pause.click();
    await expect(pause).toHaveAttribute('aria-pressed', 'true');
    await expect(pause).toContainText('Resume animations');
    const frozen = await snapshot(canvas);
    await page.waitForTimeout(600);
    expect(await snapshot(canvas)).toBe(frozen);

    await pause.click();
    await expect(pause).toHaveAttribute('aria-pressed', 'false');
    await expect.poll(() => snapshot(canvas), { timeout: 5000 }).not.toBe(frozen);
  });

  test('speed button cycles between 1× and 0.5×', async ({ page }) => {
    await page.goto('/core/');
    const speed = page.locator('#speed');
    await expect(speed).toContainText('Speed 1×');
    await speed.click();
    await expect(speed).toContainText('Speed 0.5×');
    await speed.click();
    await expect(speed).toContainText('Speed 1×');
  });

  test('arrow keys rotate the figure from the keyboard', async ({ page }) => {
    await page.goto('/core/');
    const canvas = page.locator('#side-plank canvas');
    await canvas.scrollIntoViewIfNeeded();
    await page.locator('#pp').click();
    await expect.poll(() => drawnPixels(canvas)).toBeGreaterThan(500);
    const before = await snapshot(canvas);
    await canvas.focus();
    for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowRight');
    await expect.poll(() => snapshot(canvas)).not.toBe(before);
    await page.keyboard.press('Home');
    await expect.poll(() => snapshot(canvas)).toBe(before);
  });

  test('section navigation jumps to a phase', async ({ page }) => {
    await page.goto('/core/');
    const link = page.locator('#phase-nav a[data-phase="2"]');
    await link.click();
    await expect(page).toHaveURL(/#phase-2$/);
    await expect(page.locator('#phase-2')).toBeInViewport();
  });
});

test.describe('core guide with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('shows a still working pose instead of animating', async ({ page }) => {
    await page.goto('/core/');
    const canvas = page.locator('#mcgill-curl-up canvas');
    await canvas.scrollIntoViewIfNeeded();
    await expect.poll(() => drawnPixels(canvas)).toBeGreaterThan(500);
    const still = await snapshot(canvas);
    await page.waitForTimeout(800);
    expect(await snapshot(canvas)).toBe(still);
  });
});
