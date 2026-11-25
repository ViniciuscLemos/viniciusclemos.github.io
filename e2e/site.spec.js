const { expect, test } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('shows every project, each with a link that opens it', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Vinicius Lemos', level: 1 })).toBeVisible();

  const cards = page.locator('#project-grid .card');
  await expect(cards).toHaveCount(10);
  for (const link of await page.locator('#project-grid h3 a').all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\//);
  }
  await expect(page.locator('#more-list li')).toHaveCount(8);
});

test('things appear as they scroll into view', async ({ page }) => {
  await page.goto('/');
  const last = page.locator('#contact h2');
  // below the fold it waits hidden...
  await expect(last).not.toHaveClass(/\bin\b/);
  await last.scrollIntoViewIfNeeded();
  // ...and animates in once it's on screen
  await expect(last).toHaveClass(/\bin\b/);
  await expect(last).toHaveCSS('opacity', '1');
});

test('the menu link of the section on screen is marked', async ({ page }) => {
  await page.goto('/');
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 200);
  await expect(page.locator('nav a[href="#about"]')).toHaveClass(/active/);
});

test('with reduced motion everything is simply there', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('#contact h2')).toHaveCSS('opacity', '1');
});

test('no accessibility problems and nothing wider than the screen', async ({ page }) => {
  for (const scheme of ['dark', 'light']) {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.goto('/');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.map((v) => `${scheme}: ${v.id}`)).toEqual([]);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
