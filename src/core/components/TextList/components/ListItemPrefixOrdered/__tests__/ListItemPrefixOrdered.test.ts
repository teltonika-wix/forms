import { mount } from "@vue/test-utils";
import { default as ListItemPrefixOrdered } from "../ListItemPrefixOrdered.vue";

describe("ListItemPrefixOrdered", () => {
  it("renders properly", () => {
    const wrapper = mount(ListItemPrefixOrdered, {
      shallow: true,

      props: {
        punctuation: [1, 4, 3],
      },
    });

    expect(wrapper.html()).toMatchSnapshot("Punctuation renders as 1.4.3.");
  });
});
