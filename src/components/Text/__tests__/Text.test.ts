import { mount } from '@vue/test-utils';
import Text from '../Text.vue';
import { TEXT_TV_THEME } from '../textTheme';
import type { TextTag } from '../types';

const TEXT_TAGS: TextTag[] = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'];

describe('Text', () => {
  it('renders properly', () => {
    const wrapper = mount(Text, {});
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders properly with different props', () => {
    const wrapper = mount(Text, {
      props: {
        size: 'large',
        weight: 'bold',
        tag: 'span',
        default: 'Hello text',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders properly with various props', () => {
    type TSize = keyof typeof TEXT_TV_THEME.variants.size;
    const sizes = Object.keys(TEXT_TV_THEME.variants.size) as TSize[];

    type TWeight = keyof typeof TEXT_TV_THEME.variants.weight;
    const weights = Object.keys(TEXT_TV_THEME.variants.weight) as TWeight[];
    // Map over all the props and test them
    sizes.forEach((size) => {
      weights.forEach((weight) => {
        TEXT_TAGS.forEach((tag) => {
          const props = {
            size,
            tag,
            weight,
          };
          const wrapper = mount(Text, {
            props,
          });
          expect(wrapper.html()).toMatchSnapshot(`size: ${size}, tag: ${tag}, weight: ${weight}`);
        });
      });
    });
  });
});
