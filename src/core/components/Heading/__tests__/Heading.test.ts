import { mount } from '@vue/test-utils';
import type { TextTag } from '../../Text';
import Heading from '../Heading.vue';
import { HEADING_TV_THEME } from '../headingTheme';

const TEXT_TAGS: TextTag[] = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'];

describe('Heading', () => {
  it('renders properly', () => {
    const wrapper = mount(Heading, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders properly with different props', () => {
    const wrapper = mount(Heading, {
      props: {
        size: 'h1',
        weight: 'light',
        tag: 'h1',
        default: 'Hello world',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders properly with various props', () => {
    type Size = keyof typeof HEADING_TV_THEME.variants.size;
    const sizes = Object.keys(HEADING_TV_THEME.variants.size) as Size[];

    type Weight = keyof typeof HEADING_TV_THEME.variants.weight;
    const weights = Object.keys(HEADING_TV_THEME.variants.weight) as Weight[];
    // Map over all the props and test them
    sizes.forEach((size) => {
      weights.forEach((weight) => {
        TEXT_TAGS.forEach((tag) => {
          const props = {
            size,
            tag,
            weight,
          };
          const wrapper = mount(Heading, {
            props,
          });
          expect(wrapper.html()).toMatchSnapshot(`size: ${size}, tag: ${tag}, weight: ${weight}`);
        });
      });
    });
  });
});
