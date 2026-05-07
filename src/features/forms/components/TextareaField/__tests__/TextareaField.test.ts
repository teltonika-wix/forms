import { mount } from '@vue/test-utils';
import TextareaField from '../TextareaField.vue';
import { type TextareaFieldProps } from '../types';

describe('Input field', () => {
  it('Should render without any props', () => {
    const wrapper = mount(TextareaField, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot('Default props');
  });

  it('Should render with changed label', () => {
    const wrapper = mount(TextareaField, {
      props: {
        label: 'Label',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('With label');
  });

  it('Should render with comment', () => {
    const wrapper = mount(TextareaField, {
      props: {
        comment: 'Comment',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('With comment');
  });

  it('Should render with error message', () => {
    const wrapper = mount(TextareaField, {
      shallow: true,
      props: {
        error: 'Error',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('With error');
  });

  it('Should render with counter', () => {
    const textareaFieldProps: TextareaFieldProps = {
      inputValue: 'asdf',
      maxLength: 10,
    };
    const wrapper = mount(TextareaField, {
      shallow: true,
      props: textareaFieldProps,
    });

    expect(wrapper.html()).toMatchSnapshot('With counter 4/10');
  });
});
