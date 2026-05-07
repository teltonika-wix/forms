import { mount } from '@vue/test-utils';
import InputCheckbox from '../InputCheckbox.vue';

describe('InputCheckbox', () => {
  it('renders properly', () => {
    const wrapper = mount(InputCheckbox, {
      props: {
        modelValue: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Checkbox is empty');
  });

  it('renders properly with label', () => {
    const wrapper = mount(InputCheckbox, {
      props: {
        modelValue: false,
      },
      slots: {
        label: 'Label',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Checkbox has label');
  });

  it('renders properly with error', () => {
    const wrapper = mount(InputCheckbox, {
      props: {
        modelValue: false,
      },
      slots: {
        errorMessage: 'Error',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Checkbox has error');
  });

  it('renders properly with label and error', () => {
    const wrapper = mount(InputCheckbox, {
      props: {
        modelValue: false,
      },
      slots: {
        label: 'Label',
        errorMessage: 'Error',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Checkbox has label and error');
  });

  it('renders properly with error prop', () => {
    const wrapper = mount(InputCheckbox, {
      props: {
        modelValue: false,
        error: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Checkbox is red');
  });

  it('renders input Id properly', async () => {
    const INPUT_ID = 'testInputId';
    const wrapper = mount(InputCheckbox, {
      props: {
        modelValue: false,
        id: INPUT_ID,
      },
      slots: {
        label: 'Label',
      },
    });

    const label = await wrapper.find('label');
    const input = await wrapper.find('input[type=checkbox]');

    expect(label.exists()).toBe(true);
    expect(label.attributes('for')).toBe(INPUT_ID);
    expect(input.attributes('id')).toBe(INPUT_ID);

    expect(wrapper.html()).toMatchSnapshot('Checkbox has inputId');
  });

  it('renders properly with size prop', () => {
    const wrapper = mount(InputCheckbox, {
      props: {
        modelValue: false,
        size: 'large',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Checkbox is large');
  });

  it('has input[type=checkbox]', () => {
    const wrapper = mount(InputCheckbox, {
      props: {
        modelValue: false,
      },
    });

    const input = wrapper.find('input[type=checkbox]');

    expect(input.exists()).toBe(true);
  });

  it('renders data-test-id', () => {
    const wrapper = mount(InputCheckbox, {
      props: {
        modelValue: false,
        dataTestId: 'testId',
      },
    });

    expect(wrapper.html()).toContain('data-test-id="testId"');
  });
});
