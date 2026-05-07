import { mount } from "@vue/test-utils";
import { default as LinkStyledAsIcon } from "../LinkStyledAsIcon.vue";
import { default as LinkStyledAsIconMockExampleIcon } from "../__mocks__/LinkStyledAsIconMockExampleIcon.vue";

describe("LinkStyledAsIcon", () => {
  it("renders properly", () => {
    const wrapper = mount(LinkStyledAsIcon, {
      shallow: true,
      props: {
        url: "https://google.com",
      },
      slots: {
        default: LinkStyledAsIconMockExampleIcon,
      },
    });

    expect(wrapper.html()).toMatchSnapshot("With example icon");
  });
});
