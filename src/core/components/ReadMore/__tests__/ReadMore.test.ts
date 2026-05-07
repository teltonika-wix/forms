import { mount } from "@vue/test-utils";
import { default as ReadMore } from "../ReadMore.vue";

describe("ReadMore", () => {
  it("renders properly with slot content", () => {
    const wrapper = mount(ReadMore, {
      shallow: true,
      props: {
        type: "withArrow",
        textOpened: "Text shown when opened",
        textClosed: "Text shown when closed",
        linesShown: 3,
      },
      slots: {
        default: "<p>This is the slot content</p>",
      },
    });

    expect(wrapper.html()).toMatchSnapshot("with slot content");
  });
});
