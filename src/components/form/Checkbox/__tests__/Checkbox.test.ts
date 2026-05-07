import { mount } from '@vue/test-utils';
import { default as Checkbox } from '../Checkbox.vue';

describe('Checkbox', () => {
  it('renders properly', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Checkbox is empty');
  });
});
