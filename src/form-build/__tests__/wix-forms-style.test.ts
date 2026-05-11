import { wixFormsStyles } from "../wix-forms-style";

vi.mock("src/form-build/wix-forms-tailwind.css?inline", () => ({
  default: ".mock-class { color: red; }",
}));

describe("wix-forms-style", () => {
  it("exports inline tailwind styles as a string", () => {
    expect(wixFormsStyles).toBe(".mock-class { color: red; }");
  });
});
