import { mount } from "@vue/test-utils";
import InfoTooltip from "../InfoTooltip.vue";

describe("Info tooltip", () => {
  it("Should render without props", () => {
    const wrapper = mount(InfoTooltip);

    expect(wrapper.html()).toMatchSnapshot("Without props");
  });
});
