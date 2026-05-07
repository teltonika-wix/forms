import { mount } from '@vue/test-utils';
import ErrorMessage from '../ErrorMessage.vue';

describe('Input label', () => {
  it('Should render', () => {
    const wrapper = mount(ErrorMessage, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot('Without text');
  });
  it('Should render', () => {
    const wrapper = mount(ErrorMessage, {
      slots: {
        default: 'Error message',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('With text');
  });
});
