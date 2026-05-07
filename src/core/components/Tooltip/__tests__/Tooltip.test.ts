import { type VueWrapper, mount } from "@vue/test-utils";
import Tooltip from "../Tooltip.vue";
import ExampleTooltipIcon from "../__mocks__/ExampleTooltipIcon.vue";

describe("Tooltip", () => {
  let wrapper: VueWrapper;
  const tooltipCta = "[data-testid=tooltip-reference-1]";
  const tooltip = "[data-testid=tooltip-floating-1]";
  const tooltipArrow = "[data-testid=tooltip-arrow-1]";

  beforeEach(() => {
    wrapper = mount(Tooltip, {
      props: {
        content: "Test Tooltip Content",
        placement: "top",
        dataTestId: 1,
      },
      slots: { default: ExampleTooltipIcon },
    });
  });

  it("should match snapshot when tooltip is not hovered", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should test if on hover tooltip appears and contains passed text", async () => {
    await wrapper.find(tooltipCta).trigger("mouseenter");
    expect(wrapper.find(tooltip).exists()).toBe(true);
    expect(wrapper.text()).toContain("Test Tooltip Content");
  });

  it("should test if tooltip has arrow", async () => {
    await wrapper.find(tooltipCta).trigger("mouseenter");
    const arrowStyle = wrapper.find(tooltipArrow).attributes("style");
    expect(arrowStyle).toBeDefined();
  });

  it("should match snapshot when tooltip is hovered", async () => {
    await wrapper.find(tooltipCta).trigger("mouseenter");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
