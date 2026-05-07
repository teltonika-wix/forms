import { mount } from '@vue/test-utils';
import { default as ButtonStyledAsLink } from '../ButtonStyledAsLink.vue';

describe('ButtonStyledAsLink', () => {
  it('renders properly', () => {
    const wrapper = mount(ButtonStyledAsLink, {
      shallow: true,
      slots: {
        default: 'Link text',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('With default slot filled');
  });
});
