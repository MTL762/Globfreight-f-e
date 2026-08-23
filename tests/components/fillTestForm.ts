import { expect, Page } from "@playwright/test";
import * as path from "path";
import {
  generateRandomArabicName,
  generateRandomEmail,
  generateRandomLink,
  generateRandomName,
  generateRandomNumber
} from "../helpers/RandomName.helper";
import { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export async function fillTestForm(
  page: Page,
  inputs: FormInput[],
  operationType?: "create" | "update"
) {
  for (const input of inputs) {
    let value: string;
    if (input.type === "text" && input.multiLang) {
      if (operationType === "update") {
        await page.getByTestId(`lang-Ar`).click();
        const inputValueAr = await page.getByTestId(`${input.name}Ar`).inputValue();
        await page.getByTestId(`lang-En`).click();
        const inputValueEn = await page.getByTestId(`${input.name}En`).inputValue();
        expect(inputValueAr).toBe(input.defaultValue);
        expect(inputValueEn).toBe(input.defaultValue);
      }
      value = generateRandomArabicName(10);

      input.defaultValue = value;
      await page.getByTestId(`lang-Ar`).click();
      await page.getByTestId(`${input.name}Ar`).click();
      await page.getByTestId(`${input.name}Ar`).fill(input.defaultValue);
      await page.getByTestId(`lang-En`).click();
      value = generateRandomName(10);
      input.defaultValue = value;
      await page.getByTestId(`${input.name}En`).click();
      await page.getByTestId(`${input.name}En`).fill(input.defaultValue);
    } else if (input.type === "text" || input.type === "textarea") {
      if (operationType === "update") {
        const inputValue = await page.getByTestId(input.name).inputValue();
        expect(inputValue).toBe(input.defaultValue);
      }
      value = generateRandomName(10);
      input.defaultValue = value;
      await page.getByTestId(`${input.name}`).click();
      await page.getByTestId(`${input.name}`).fill(input.defaultValue);
    } else if (input.type === "link") {
      if (operationType === "update") {
        const inputValue = await page.getByTestId(input.name).inputValue();
        expect(inputValue).toBe(input.defaultValue);
      }
      value = generateRandomLink();
      input.defaultValue = value;
      await page.getByTestId(`${input.name}`).click();
      await page.getByTestId(`${input.name}`).fill(input.defaultValue);
    } else if (input.type === "email") {
      if (operationType === "update") {
        const inputValue = await page.getByTestId(input.name).inputValue();
        expect(inputValue).toBe(input.defaultValue);
      }
      value = generateRandomEmail();
      input.defaultValue = value;
      await page.getByTestId(input.name).click();
      await page.getByTestId(input.name).fill(input.defaultValue);
    } else if (input.type === "number") {
      if (operationType === "update") {
        const inputValue = await page.getByTestId(input.name).inputValue();
        expect(Number(inputValue)).toBe(Number(input.defaultValue));
      }
      value = generateRandomNumber(3);
      input.defaultValue = value;
      await page.getByTestId(input.name).click();
      await page.getByTestId(input.name).fill(input.defaultValue);
    } else if (input.type === "tel") {
      if (operationType === "update") {
        const inputValue = await page.getByTestId(input.name).inputValue();
        expect(inputValue).toBe(input.defaultValue);
      }
      value = generateRandomNumber(10);
      input.defaultValue = value;
      await page.getByTestId(input.name).click();
      await page.getByTestId(input.name).fill(input.defaultValue);
    } else if (input.type === "selectPaginated") {
      try {
        // Click on the select field to open dropdown
        await page.getByTestId(input.name).click();
        await page.waitForTimeout(1500); // Wait for dropdown to appear
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Enter");
        await page.keyboard.press("Escape");
      } catch (error) {
        console.error(`Error selecting from dropdown ${input.name}:`, error);
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Enter");
        await page.keyboard.press("Escape");
        // Try to recover by pressing escape to close any open dropdown
        await page.keyboard.press("Escape");
      }
    } else if (input.type === "time") {
      await page.getByTestId(`${input.name}-date`).click();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Space");
      console.log("here");
      await page.getByTestId(`${input.name}`).click();
      const [fileChooser] = await Promise.all([
        page.waitForEvent("filechooser"),
        page.getByTestId(`${input.name}-upload`).click()
      ]);
      await fileChooser.setFiles([path.join(__dirname, "../assets/test-image.png")]);
    } else {
      console.warn(`Unsupported input type: ${input.type}`);
    }
  }
  return inputs;
}

export async function TableSearchWithReload({
  page,
  searchKey,
  searchValue
}: {
  page: Page;
  searchValue?: string;
  searchKey: string;
}) {
  await page.getByTestId(searchKey).click();
  await page.getByTestId(searchKey).fill(searchValue || "");
  await page.keyboard.press("Enter");
  // await page.reload();
}
