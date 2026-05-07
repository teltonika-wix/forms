import { mount } from "@vue/test-utils";
import Label from "../Label.vue";

describe("Label", () => {
  it("Should render without any props", () => {
    const wrapper = mount(Label, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot("Default props");
  });

  it("Should render with changed theme", () => {
    const wrapper = mount(Label, {
      shallow: true,
      props: {
        color: "dark",
      },
    });

    expect(wrapper.html()).toMatchSnapshot("With changed theme");
  });
});
