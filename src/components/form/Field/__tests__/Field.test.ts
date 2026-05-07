import { mount } from "@vue/test-utils";
import Field from "../Field.vue";

describe("Form field", () => {
  it("Should render without any props and slots", () => {
    const wrapper = mount(Field, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot("Default props");
  });

  it("should render default field with input element in slot", () => {
    const wrapper = mount(Field, {
      slots: {
        default: '<input type="text">',
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Input element in slot");
  });

  it("should render default field with input element in slot and information tooltip", () => {
    const wrapper = mount(Field, {
      slots: {
        default: '<input type="text">',
      },
      props: {
        comment: "Information message",
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Input element in slot and information tooltip");
  });

  it("should render default field with textarea element in slot and information tooltip", () => {
    const wrapper = mount(Field, {
      slots: {
        default: "<textarea></textarea>",
      },
      props: {
        comment: "Information message",
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Input element in slot and information tooltip");
  });

  it("should render error field", () => {
    const wrapper = mount(Field, {
      shallow: true,
      props: {
        error: "Error message",
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Error field");
  });

  it("should render disabled field", () => {
    const wrapper = mount(Field, {
      shallow: true,
      props: {
        disabled: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Disabled field");
  });
});
