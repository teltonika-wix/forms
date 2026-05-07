import { mount } from "@vue/test-utils";
import SelectMenu from "../SelectMenu.vue";
import type { SelectMenuOption } from "../components/SelectMenuDropdown";

const selectMenuOptions: SelectMenuOption[] = [
  { label: "Option 1", value: "option_1" },
  { label: "Option 2", value: "option_2" },
  { label: "Option 3", value: "option_3" },
  { label: "Option 4", value: "option_4" },
  { label: "Option 5", value: "option_5" },
  { label: "Option 6", value: "option_6" },
  { label: "Option 7", value: "option_7" },
  { label: "Option 8", value: "option_8" },
];
const defaultValue = { label: "Option 4", value: "option_4" };

describe("SelectMenu", () => {
  it("Should check base rendering", () => {
    const wrapper = mount(SelectMenu, {
      props: {
        selectMenuOptions,
        defaultValue,
        id: "field_id",
        label: "label",
        error: "error text",
        disabled: false,
        placeholder: "Select value",
      },
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot("Selected");
  });
});
