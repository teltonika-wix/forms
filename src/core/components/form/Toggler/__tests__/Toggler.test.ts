import { mount } from "@vue/test-utils";
import Toggler from "../Toggler.vue";

describe("Toggler", () => {
  it("should render correctly", () => {
    const wrapper = mount(Toggler, {
      props: {
        isActive: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Initial render");
  });

  it("should toggle active state on click", async () => {
    const wrapper = mount(Toggler, {
      props: {
        isActive: false,
      },
    });

    await wrapper.find("input").setValue(true);

    expect(wrapper.html()).toMatchSnapshot("Active state");
    expect(wrapper.find("input").element.checked).toBe(true);
  });

  it("should not toggle when disabled", async () => {
    const wrapper = mount(Toggler, {
      props: {
        isActive: true,
        isDisabled: true,
      },
    });

    await wrapper.find("label").trigger("click");

    expect(wrapper.html()).toMatchSnapshot("Disabled state");
    expect(wrapper.find("input").element.checked).toBe(true);
  });

  it("should toggle active state on Enter key press", async () => {
    const wrapper = mount(Toggler, {
      props: {
        isActive: false,
      },
    });

    await wrapper.find("label").trigger("keydown.enter");

    expect(wrapper.html()).toMatchSnapshot(
      "Active state after Enter key press",
    );
    expect(wrapper.find("input").element.checked).toBe(true);
  });
});
