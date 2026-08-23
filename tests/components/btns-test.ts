import { Page } from "@playwright/test";
import { checkToast } from "./Toast.check";

export async function SubmitAddBtn(page: Page) {
  await page.waitForTimeout(1000);
  // await page.unrouteAll();
  const submitButton = page.getByTestId("submit-form");
  // Clear all existing routes
  if ((await submitButton.count()) === 0) {
    throw new Error("Submit button with test ID 'submit-go' not found");
  }
  await submitButton.click();
  await checkToast(page);
}

export async function SubmitUpdateBtn(page: Page) {
  await page.getByTestId("button-edit").click();
}
export async function ClickEditBtn(page: Page) {
  await page.getByTestId("table-edit-btn").first().click();
}
