import { mount } from '@vue/test-utils';
import Radio from '../Radio.vue';

describe('Radio component', () => {
  it('renders properly', () => {
    const wrapper = mount(Radio, {
      propsData: {
        id: 'testing-input',
        size: 'medium',
        label: 'Some label',
        name: 'my-group',
        value: 'first',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('changes initial value when clicked on another radio', async () => {
    const wrapper = mount(Radio, {
      propsData: {
        modelValue: 'second',
        id: 'testing-input',
        size: 'medium',
        label: 'Some label',
        name: 'my-group',
        value: 'first',
      },
    });

    const wrapperTwo = mount(Radio, {
      propsData: {
        modelValue: 'second',
        id: 'testing-input',
        size: 'medium',
        label: 'Some label',
        name: 'my-group',
        value: 'second',
      },
    });

    expect(wrapper.find('input').element.checked).toBe(false);
    expect(wrapperTwo.find('input').element.checked).toBe(true);

    await wrapper.find('div').trigger('click');
    await wrapper.setProps({ modelValue: 'first' });
    await wrapperTwo.setProps({ modelValue: 'first' });

    expect(wrapper.find('input').element.checked).toBe(true);
    expect(wrapperTwo.find('input').element.checked).toBe(false);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('keeps the same value after multiple clicks on the same radio', async () => {
    const wrapper = mount(Radio, {
      props: {
        modelValue: 'first',
        id: 'radio-1',
        size: 'medium',
        label: 'Label 1',
        name: 'my-group',
        value: 'first',
      },
    });

    expect(wrapper.find('input').element.checked).toBe(true);

    await wrapper.find('div').trigger('click');
    await wrapper.find('div').trigger('click');
    await wrapper.find('div').trigger('click');

    expect(wrapper.find('input').element.checked).toBe(true);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
