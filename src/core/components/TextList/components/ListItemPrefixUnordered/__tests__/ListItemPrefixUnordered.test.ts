import { mount } from "@vue/test-utils";
import { default as ListItemPrefixUnordered } from "../ListItemPrefixUnordered.vue";

describe("ListItemPrefixUnordered", () => {
  it("renders properly", () => {
    const wrapper = mount(ListItemPrefixUnordered, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot("Bubble is visible");
  });
});
