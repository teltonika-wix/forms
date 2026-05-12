import { createFormStore } from "../createFormStore";

describe("createFormStore", () => {
  it("clears input error when input value changes", () => {
    const formStore = createFormStore();
    const inputName = "email";

    formStore.addFormInput(inputName, "");
    formStore.updateFormInputError(inputName, "Email is required");

    formStore.updateFormInputValue(inputName, "user@example.com");

    expect(formStore.formInputsState[inputName]?.errorMessage).toBe("");
  });
});
