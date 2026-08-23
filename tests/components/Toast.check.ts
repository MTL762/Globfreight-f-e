import { Page, expect } from "@playwright/test";

export async function checkToast(page: Page) {
  // Wait for Sonner toast to appear
  const toastElement = await page.waitForSelector("[data-sonner-toast]", {
    timeout: 15000
  });
  // Assert the presence of the toast
  expect(toastElement).not.toBeNull();
  const toastContent = await toastElement.textContent();
  // Check toast type by CSS classes or data attributes
  const toastClasses = (await toastElement.getAttribute("class")) || "";
  const toastType = (await toastElement.getAttribute("data-type")) || "";

  let toastColor = "unknown";

  if (toastClasses.includes("success") || toastType === "success") {
    toastColor = "green";
  } else if (toastClasses.includes("error") || toastType === "error") {
    toastColor = "red";
  }
  console.log(`Toast color: ${toastColor}`);
  console.log(`Toast message: ${toastContent}`);
  if (toastColor === "red") {
    throw new Error(`Error toast received: ${toastContent}`);
  }
  return { color: toastColor, message: toastContent };
}
