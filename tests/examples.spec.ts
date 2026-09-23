import { expect, test } from "@playwright/test";

test("shell links, member creation, filters, and settings work locally", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/docs/app-shell");
  await page.getByRole("link", { name: "Open shell example" }).click();
  await expect(page).toHaveURL(/\/examples$/);
  await expect(
    page.getByRole("heading", { name: "Dashboard", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Members", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Create member", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Full name").fill("Casey Example");
  await dialog.getByLabel("Business name").fill("Example Studio");
  await dialog.getByLabel("City").fill("Hyderabad");
  await dialog.getByRole("button", { name: "Create", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await page.getByPlaceholder("Search members").fill("Casey");
  await expect(page.getByRole("row").filter({ hasText: "Casey Example" }).getByRole("cell").first()).toContainText("Casey Example");
  await page.getByRole("button", { name: "All members", exact: true }).click();
  await page.getByRole("menuitem", { name: "Approved", exact: true }).click();
  await expect(page.getByText("No records found")).toBeVisible();
  await page
    .getByRole("button", { name: "Settings", exact: true })
    .first()
    .click();
  await page
    .getByRole("link", { name: "Account settings", exact: true })
    .click();
  await page.getByLabel("Full name").fill("Casey Example");
  await page.getByRole("button", { name: "Save profile" }).click();
  await expect(
    page.getByRole("heading", { name: "Casey Example" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Notifications", exact: true })
    .click();
  await expect(dialog.getByText("You're all caught up")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.getByRole("button", { name: "Member", exact: true }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Contacts", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile shell dismisses navigation, matches variants, and does not overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/examples");
  const trigger = page.getByRole("button", {
    name: "Open navigation",
    exact: true,
  });
  await trigger.click();
  let drawer = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(drawer).toHaveCSS("width", "225px");
  await drawer.getByRole("link", { name: "Members", exact: true }).click();
  await expect(drawer).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Members", exact: true }),
  ).toBeVisible();
  await expect(trigger).toBeFocused();
  await page.getByRole("button", { name: "Member", exact: true }).click();
  await trigger.click();
  drawer = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(drawer).toHaveCSS("width", "275px");
  await drawer
    .getByRole("link", { name: "Connected apps", exact: true })
    .click();
  await expect(drawer).not.toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await trigger.click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(drawer).not.toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(drawer).not.toBeVisible();
});
