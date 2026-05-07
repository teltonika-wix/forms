import { mount } from "@vue/test-utils";
import InputHelper from "../InputHelper.vue";

describe("Input helper", () => {
  it("Should render without any props", () => {
    const wrapper = mount(InputHelper, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot("Default props");
  });

  it("Should render with error message", () => {
    const wrapper = mount(InputHelper, {
      props: {
        error: "Error message",
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Error message");
  });

  it("Should render with counter 5/10", () => {
    const wrapper = mount(InputHelper, {
      props: {
        valueLength: 5,
        maxValueLength: 10,
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Counter 5/10");
  });

  it("Should render with error message and counter 5/10", () => {
    const wrapper = mount(InputHelper, {
      props: {
        valueLength: 5,
        maxValueLength: 10,
        errorMessage: "Error message",
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Error message and counter 5/10");
  });
});
