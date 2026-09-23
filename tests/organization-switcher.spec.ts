import { expect, test } from '@playwright/test';

test('admin toolbar opens a searchable right overlay and restores focus', async ({page}) => {
  await page.goto('/examples');
  const trigger=page.getByRole('button',{name:'Switch organization: Acme Network'});
  await trigger.click();
  const drawer=page.getByRole('dialog',{name:'Organizations',exact:true});
  await expect(drawer).toBeVisible();
  await expect(drawer).toHaveCSS('width','400px');
  const box=await drawer.boundingBox();
  expect(box!.x+box!.width).toBe(page.viewportSize()!.width);
  await expect(drawer.getByRole('button',{name:/Acme Network/})).toHaveAttribute('aria-current','true');
  await drawer.getByRole('searchbox',{name:'Search organizations'}).fill('not-found');
  await expect(drawer.getByRole('status')).toHaveText('No organizations match your search.');
  await drawer.getByRole('searchbox',{name:'Search organizations'}).fill('design');
  await drawer.getByRole('button',{name:/Design Team/}).click();
  await expect(drawer).not.toBeVisible();
  const updated=page.getByRole('button',{name:'Switch organization: Design Team'});
  await expect(updated).toBeFocused();
  await updated.click();
  await expect(drawer.getByRole('searchbox')).toHaveValue('');
  for(let i=0;i<8;i++) await page.keyboard.press('Tab');
  expect(await page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"]'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(updated).toBeFocused();
  await updated.click();
  await page.mouse.click(20,300);
  await expect(drawer).not.toBeVisible();
  await updated.click();
  await drawer.getByRole('button',{name:'Manage',exact:true}).click();
  await expect(drawer).not.toBeVisible();
  await expect(page.getByRole('heading',{name:'Account settings',exact:true})).toBeVisible();
});

test('organization overlay fills mobile viewport and closes with its button',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/docs/organization-switcher');
  await page.getByRole('button',{name:'Switch organization: Acme Workspace'}).click();
  const drawer=page.getByRole('dialog',{name:'Organizations',exact:true});
  await expect(drawer).toHaveCSS('width','390px');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await drawer.getByRole('button',{name:'Close organizations'}).click();
  await expect(drawer).not.toBeVisible();
});
