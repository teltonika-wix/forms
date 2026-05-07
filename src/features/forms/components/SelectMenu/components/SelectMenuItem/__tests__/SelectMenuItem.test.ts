import { mount } from "@vue/test-utils";
import SelectMenuItem from "../SelectMenuItem.vue";

describe("SelectMenuItem", () => {
  it("Should check rendering when not selected", () => {
    const wrapper = mount(SelectMenuItem, {
      props: {
        isSelected: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Not selected");
  });

  it("Should check rendering when selected", () => {
    const wrapper = mount(SelectMenuItem, {
      props: {
        isSelected: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Selected");
  });
});
