import { type VueWrapper, mount } from "@vue/test-utils";
import ExpandableBlock from "../ExpandableBlock.vue";

describe("ExpandableBlock", () => {
  it("renders correctly with slots, snapshot", () => {
    const wrapper = mount(ExpandableBlock, {
      slots: {
        head: "<div>head</div>",
        body: "<div>body</div>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
  it("should check if isOpen updates correctly", async () => {
    const wrapper: VueWrapper = mount(ExpandableBlock, {
      props: {
        isOpen: false,
        "onUpdate:isOpen": (e) => wrapper.setProps({ isOpen: e }),
      },
    });

    await wrapper.find(".cursor-pointer").trigger("click");

    expect(wrapper.emitted()["update:isOpen"]).toBeTruthy();
    expect(wrapper.emitted()["update:isOpen"][0]).toEqual([true]);

    await wrapper.find(".cursor-pointer").trigger("click");
    expect(wrapper.emitted()["update:isOpen"][1]).toEqual([false]);
  });
});
