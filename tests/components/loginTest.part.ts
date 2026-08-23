import { Page } from "@playwright/test";

export async function loginTest(page: Page) {
  await page.goto("http://localhost:3000/ar/signin");
  await page.waitForURL("http://localhost:3000/ar/signin");
  await page.waitForTimeout(4000);
  await page.getByPlaceholder("m@example.com").click();
  await page.getByPlaceholder("m@example.com").fill("admin@admin.com");
  await page.getByPlaceholder("m@example.com").press("Tab");
  //await page.getAttribute("");
  await page.locator("//input[@type='password']").fill("Nnnnnn@1233");
  await page.locator("//button[@type='submit']").press("Enter");

  await page.waitForTimeout(3000);
}
