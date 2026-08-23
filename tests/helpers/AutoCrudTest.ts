import { Page } from "@playwright/test";
import { fillTestForm, TableSearchWithReload } from "../components/fillTestForm";
import { loginTest } from "../components/loginTest.part";
import { checkToast } from "../components/Toast.check";
import { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { ClickEditBtn, SubmitAddBtn } from "../components/btns-test";

export async function AutoCrudTest(
  page: Page,
  addLink: string,
  viewLink: string,
  inputs: FormInput[],
  filterName?: string
) {
  await loginTest(page);
  await page.goto(addLink);
  await page.waitForURL(addLink);

  const addInputs = await fillTestForm(page, inputs as FormInput[]);
  await SubmitAddBtn(page);
  await checkToast(page);
  await page.goto(viewLink);
  if (filterName) {
    await TableSearchWithReload({
      page,
      searchKey: filterName,
      searchValue: addInputs.find(input => input.name === filterName)?.defaultValue || ""
    });

    await ClickEditBtn(page);
    const editedInputs = await fillTestForm(page, addInputs, "update");
    await SubmitAddBtn(page);
    await checkToast(page);

    await TableSearchWithReload({
      page: page,
      searchKey: filterName,
      searchValue: editedInputs.find(input => input.name === filterName)?.defaultValue || ""
    });
  }

  await page.getByTestId("delete-btn").first().click();
  await page.getByTestId("delete-confirm-btn").click();
  await checkToast(page);
}
