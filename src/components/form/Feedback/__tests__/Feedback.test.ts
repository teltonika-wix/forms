import { mount } from "@vue/test-utils";
import { default as Feedback } from "../Feedback.vue";

describe("Feedback", () => {
  it("renders properly", () => {
    const wrapper = mount(Feedback, {
      props: {
        modelValue: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Feedback is empty");
  });
});
