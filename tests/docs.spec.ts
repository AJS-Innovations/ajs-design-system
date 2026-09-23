import { test, expect } from '@playwright/test';
import { catalog } from '../src/lib/catalog';

test('every documentation route renders with no client exceptions', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const doc of catalog) {
    await page.goto(`/docs/${doc.slug}`);
    await expect(page.getByRole('heading', { name: doc.title, exact: true }).first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('command palette searches and navigates using the keyboard', async ({ page }) => {
  await page.goto('/docs');
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('combobox').fill('Data table');
  await expect(dialog.locator('[cmdk-item][data-selected="true"]')).toContainText('Data table');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/docs\/data-table$/);
  await expect(dialog).not.toBeVisible();
});

test('table filters, sorts, paginates, and opens a detail dialog', async ({ page }) => {
  await page.goto('/docs/data-table');
  const demo = page.getByRole('tabpanel');
  await demo.getByPlaceholder('Search contacts').fill('Jamie');
  await expect(demo.getByRole('row')).toHaveCount(2);
  await expect(demo.getByText('Jamie Chen')).toBeVisible();
  await demo.getByPlaceholder('Search contacts').fill('');
  await demo.getByRole('button', {name:'Name',exact:true}).click();
  await expect(demo.locator('th[aria-sort="ascending"]')).toHaveText('Name');
  await demo.getByRole('button', {name:'Next page'}).click();
  await expect(demo.getByText('4–5 of 5')).toBeVisible();
  await demo.getByRole('button', {name:'Previous page'}).click();
  await demo.getByRole('button', {name:'Actions for Alex Morgan'}).click();
  await page.getByRole('menuitem', {name:'Business Info'}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('dialog traps focus and restores it', async ({ page }) => {
  await page.goto('/docs/dialog');
  const trigger=page.getByRole('button',{name:'View business information'});
  await trigger.click();
  const dialog=page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for(let i=0;i<6;i++) await page.keyboard.press('Tab');
  expect(await page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"]'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('mobile docs do not overflow and navigation works', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  for(const path of ['/','/docs','/docs/button','/docs/data-table','/docs/sidebar']) {
    await page.goto(path);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.getByRole('button',{name:'Open documentation navigation'}).click();
  await page.getByRole('dialog').getByRole('link',{name:'Input & field'}).click();
  await expect(page).toHaveURL(/\/docs\/input$/);
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('landing links to docs and the live component preview works', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', {name:'Less setup. More building.'})).toBeVisible();
  await page.getByRole('button', {name:'Save changes'}).click();
  await expect(page.getByRole('status')).toHaveText('Saved in this preview.');
  await page.getByRole('tab', {name:'Members',exact:true}).click();
  await expect(page.getByText('Jamie Chen')).toBeVisible();
  await page.getByRole('link',{name:'Start building'}).click();
  await expect(page).toHaveURL(/\/docs$/);
  await expect(page.getByRole('navigation',{name:'Documentation'})).toBeVisible();
  await page.getByRole('link',{name:'Overview',exact:true}).click();
  await expect(page).toHaveURL(/\/docs$/);
});

test('timeline code includes every preview timestamp and entry', async ({ page }) => {
  await page.goto('/docs/timeline');
  const preview=page.getByRole('tabpanel');
  const dates=await preview.locator('time').allTextContents();
  const activities=await preview.locator('li p.font-medium').allTextContents();
  expect(dates).toEqual(['23 Sep 2026, 10:30 AM','22 Sep 2026, 4:15 PM','21 Sep 2026, 9:00 AM']);
  await page.getByRole('tab',{name:/^code$/i}).click();
  const code=page.getByRole('tabpanel').locator('code');
  for(const value of [...dates,...activities]) await expect(code).toContainText(value);
  await expect(code).toContainText('export default function Example()');
});
