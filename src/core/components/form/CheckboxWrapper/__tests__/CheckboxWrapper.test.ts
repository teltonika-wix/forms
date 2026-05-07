import { mount } from "@vue/test-utils";
import { default as CheckboxWrapper } from "../CheckboxWrapper.vue";

describe("Checkbox", () => {
  it("renders properly", () => {
    const wrapper = mount(CheckboxWrapper, {});

    expect(wrapper.html()).toMatchSnapshot("Checkbox is empty");
  });
});
