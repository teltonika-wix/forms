import { mount } from '@vue/test-utils';
import { default as LinkStyledAsButton } from '../LinkStyledAsButton.vue';

describe('LinkStyledAsButton', () => {
  it('renders properly', () => {
    const wrapper = mount(LinkStyledAsButton, {
      shallow: true,
      props: {
        color: 'accent',
        size: 'small',
        width: 'auto',
        url: 'https://google.com',
      },
      slots: {
        default: 'Button text',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('With default props filled');
  });
});
