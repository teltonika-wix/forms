import { mount } from "@vue/test-utils";
import InteractiveLabel from "../InteractiveLabel.vue";

describe("InteractiveLabel", () => {
  it("Should render with internal link", () => {
    const wrapper = mount(InteractiveLabel, {
      shallow: true,
      props: {
        url: "/?path=/story/button--playground",
      },
    });

    expect(wrapper.html()).toMatchSnapshot("With internal link");
  });

  it("Should render with external link", () => {
    const wrapper = mount(InteractiveLabel, {
      shallow: true,
      props: {
        url: "https://www.google.com",
        external: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot("With external link");
  });
});
