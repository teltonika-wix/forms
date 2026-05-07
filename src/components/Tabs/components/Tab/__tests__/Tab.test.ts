import { mount } from "@vue/test-utils";
import { default as Tab } from "../Tab.vue";

describe("Tab", () => {
  it("Renders properly simple tab", () => {
    const wrapper = mount(Tab, {
      shallow: true,
      props: {
        name: "Simple tab",
      },

      slots: {
        default: "<div>Body of tab</div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
