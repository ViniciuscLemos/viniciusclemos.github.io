const { expect, test } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('shows every project and the ones on GitHub', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Vinicius Lemos', level: 1 })).toBeVisible();
  await expect(page.locator('#project-grid .card')).toHaveCount(10);
  await expect(page.locator('#more-list li')).toHaveCount(8);
});

test('a card opens the details of the project, and Esc closes them', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'trail' }).click();

  const dialog = page.getByRole('dialog', { name: 'trail' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('What was interesting')).toBeVisible();
  await expect(dialog.getByRole('link', { name: 'Open it live' })).toHaveAttribute('href', 'https://trail-sfqz.onrender.com');
  await expect(dialog.getByRole('link', { name: 'Code on GitHub' })).toHaveAttribute('href', /github\.com\/ViniciuscLemos\/url-shortener/);
  await expect(page).toHaveURL(/#trail$/);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(page).not.toHaveURL(/#trail$/);
  // the focus goes back to the card that opened it
  await expect(page.getByRole('button', { name: 'trail' })).toBeFocused();
});

test('a project without a live site only links to the code', async ({ page }) => {
  await page.goto('/#recon');
  const dialog = page.getByRole('dialog', { name: /recon/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('paused')).toBeVisible();
  await expect(dialog.getByRole('link', { name: 'Open it live' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toBeHidden();
});

test('filters the projects by what they are made with', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#project-grid .card:visible');
  await page.getByRole('button', { name: 'Java', exact: true }).click();
  await expect(cards).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'booking-system' })).toBeVisible();
  await expect(page.locator('#filter-count')).toHaveText('1 of 10');

  await page.getByRole('button', { name: 'Python' }).click();
  await expect(page.getByRole('button', { name: 'Python' })).toHaveAttribute('aria-pressed', 'true');
  await expect(cards).toHaveCount(3);

  await page.getByRole('button', { name: 'All' }).click();
  await expect(cards).toHaveCount(10);
  await expect(page.locator('#filter-count')).toHaveText('');
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
    // the page, and the page with a project open
    for (const path of ['/', '/#expense-tracker']) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations.map((v) => `${scheme} ${path}: ${v.id}`)).toEqual([]);
    }
  }
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
