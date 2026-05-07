import * as tailwindPreset from "../tailwindPreset";
import * as tailwindPresetEditor from "../tailwindPresetEditor";

describe("tailwindPreset", () => {
  it("should check the equality of Tailwind presets", () => {
    const defaultOptions = tailwindPreset.default;
    const defaultEditorOptions =
      "default" in tailwindPresetEditor ? tailwindPresetEditor.default : {};

    expect({ ...defaultOptions, plugins: null }).toMatchObject({
      ...(defaultEditorOptions as object),
      plugins: null,
    });
  });
});
