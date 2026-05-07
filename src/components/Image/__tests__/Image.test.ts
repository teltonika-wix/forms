import { mount } from "@vue/test-utils";
import Image from "../Image.vue";
import { formatSizes } from "../utils/formatSizes";

describe("Image Component", () => {
  it("renders correctly with srcSetSizes and matches snapshot", () => {
    const wrapper = mount(Image, {
      props: {
        src: "https://teltonika-iot-group.com/cdn-images/files/24/07/teltonika-milano-ofice-1920x-840x560.jpg",
        alt: "Responsive Image",
        srcSetSizes: ["424", "872", "984"],
        sizes: {
          sm: "984px",
          lg: "424px",
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render an image with basic attributes", () => {
    const wrapper = mount(Image, {
      props: {
        src: "example.jpg",
        alt: "Example Image",
      },
    });

    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe("example.jpg");
    expect(img.attributes("alt")).toBe("Example Image");
    expect(img.attributes("loading")).toBe("lazy");
  });

  it("should check if lazy loading is removed when lazyLoad is false", () => {
    const wrapper = mount(Image, {
      props: {
        src: "lazy-example.jpg",
        alt: "Example Image",
        lazyLoad: false,
      },
    });

    expect(wrapper.find("img").attributes("loading")).toBeUndefined();
  });

  it("should compute srcset and sizes correctly from srcSetSizes and sizes props", async () => {
    const wrapper = mount(Image, {
      props: {
        alt: "Example Image",
        src: "https://teltonika-iot-group.com/cdn-images/files/24/07/teltonika-milano-ofice-1920x-840x560.jpg",
        srcSetSizes: ["424", "872", "984"],
        sizes: {
          sm: "984px",
          lg: "424px",
        },
      },
    });

    await wrapper.vm.$nextTick();
    const img = wrapper.find("img");

    // Check the srcset formatting
    expect(img.attributes("srcset")).toContain(
      "https://teltonika-iot-group.com/cdn-images/files/24/07/teltonika-milano-ofice-1920x-840x560.jpg?width=424 424w",
    );
    expect(img.attributes("srcset")).toContain(
      "https://teltonika-iot-group.com/cdn-images/files/24/07/teltonika-milano-ofice-1920x-840x560.jpg?width=872 872w",
    );
    expect(img.attributes("srcset")).toContain(
      "https://teltonika-iot-group.com/cdn-images/files/24/07/teltonika-milano-ofice-1920x-840x560.jpg?width=984 984w",
    );

    // Check the sizes formatting
    const expectedSizes = formatSizes({
      sm: "984px",
      lg: "424px",
    });
    expect(img.attributes("sizes")).toBe(expectedSizes);
  });

  it("omits srcset and sizes attributes when not provided", () => {
    const wrapper = mount(Image, {
      props: {
        alt: "Example Image",
        src: "simple.jpg",
      },
    });

    const img = wrapper.find("img");
    expect(img.attributes("srcset")).toBeUndefined();
    expect(img.attributes("sizes")).toBeUndefined();
  });

  // New test case for the formatSizes function directly
  it("formats sizes correctly based on the breakpoints", () => {
    const sizes = {
      sm: "984px",
      lg: "424px",
    };

    const formattedSizes = formatSizes(sizes);
    expect(formattedSizes).toBe("(min-width: 1024px) 424px, (min-width: 320px) 984px, 100vw");
  });

  it("formats sizes correctly when all breakpoints are provided", () => {
    const sizes = {
      sm: "312px",
      md: "624px",
      lg: "936px",
      xl: "1248px",
    };

    const formattedSizes = formatSizes(sizes);
    expect(formattedSizes).toBe(
      "(min-width: 1440px) 1248px, (min-width: 1024px) 936px, (min-width: 768px) 624px, (min-width: 320px) 312px, 100vw",
    );
  });

  it("formats sizes correctly when only one breakpoint is provided", () => {
    const sizes = {
      md: "768px",
    };

    const formattedSizes = formatSizes(sizes);
    expect(formattedSizes).toBe("(min-width: 768px) 768px, 100vw");
  });
});
