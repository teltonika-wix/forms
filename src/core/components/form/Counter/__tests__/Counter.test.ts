import { mount } from "@vue/test-utils";
import Counter from "../Counter.vue";

describe("Counter", () => {
  it("Should render without props", () => {
    const wrapper = mount(Counter);

    expect(wrapper.html()).toMatchSnapshot("Without props");
  });

  it("Should render 3/10", () => {
    const wrapper = mount(Counter, {
      props: {
        current: 3,
        max: 10,
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Counter 3 / 10");
  });
});
