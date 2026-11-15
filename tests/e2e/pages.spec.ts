import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { expect, hasNoHorizontalScroll, test } from './fixtures';

const dist = path.join(import.meta.dirname, '..', '..', 'dist');

/** Every built page, as a URL path, so a new page is covered without editing this file. */
function builtPages(dir = dist): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return builtPages(full);
    if (entry.name !== 'index.html') return [];
    const url = '/' + path.relative(dist, dir).split(path.sep).join('/');
    return [url === '/' ? '/' : `${url}/`];
  });
}

const isRedirect = (url: string) => readFileSync(path.join(dist, url, 'index.html'), 'utf8').includes('http-equiv="refresh"');
const redirects = builtPages().filter(isRedirect);
const pages = builtPages().filter(url => !isRedirect(url));

test.describe('every page', () => {
  test('shared layout fills mobile and wide displays with small side gutters', async ({ page }) => {
    for (const width of [390, 1920, 2560]) {
      await page.setViewportSize({ width, height: 900 });
      for (const url of ['/home/', '/strength/', '/strength/weekly-plan/', '/strength/exercises/barbell-bench-press/', '/core/', '/getting-started/', '/calisthenics/', '/plyometrics/']) {
        await page.goto(url);
        const layout = await page.locator('.wrap').evaluateAll(elements => elements.map(element => {
          const bounds = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            left: bounds.left,
            right: document.documentElement.clientWidth - bounds.right,
            leftGutter: parseFloat(style.paddingLeft),
            rightGutter: parseFloat(style.paddingRight),
          };
        }));
        expect(layout.length).toBeGreaterThanOrEqual(3);
        for (const bounds of layout) {
          expect(Math.abs(bounds.left)).toBeLessThanOrEqual(1);
          expect(Math.abs(bounds.right)).toBeLessThanOrEqual(1);
          expect(bounds.leftGutter).toBeLessThanOrEqual(16);
          expect(bounds.rightGutter).toBeLessThanOrEqual(16);
        }
        expect(await hasNoHorizontalScroll(page), `${url} at ${width}px`).toBe(true);
      }
    }
  });

  test('the build produced pages', () => {
    expect(pages.length).toBeGreaterThan(100);
  });

  for (const url of pages) {
    test(`${url} loads cleanly`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main#main')).toBeVisible();
      await expect(page).toHaveTitle(/\S/);
      expect(await hasNoHorizontalScroll(page), 'horizontal scroll').toBe(true);
    });
  }
});

test.describe('redirects', () => {
  for (const url of redirects) {
    test(`${url} lands on a real page`, async ({ page }) => {
      await page.goto(url);
      await page.waitForURL(target => target.pathname !== url);
      await expect(page.locator('h1')).toHaveCount(1);
    });
  }
});
