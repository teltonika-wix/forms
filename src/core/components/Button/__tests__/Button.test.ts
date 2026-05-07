import { mount } from '@vue/test-utils';
import { default as Button } from '../Button.vue';
import ExampleIcon from '../__mocks__/ExampleIcon.vue';
import { buttonVariantsMock } from '../__mocks__/buttonAllPropsVariants';
import type { ButtonProps } from '../types';

const { buttonAllPropsVariants } = buttonVariantsMock;
const onClickMock = vi.fn();
const defaultProps: ButtonProps = { color: 'primary', size: 'medium' };

describe('Button', () => {
  it('should test rendering for all property variants', () => {
    const wrapper = mount(Button);

    buttonAllPropsVariants.forEach((props) => {
      wrapper.setProps(props);

      expect(wrapper.html()).toMatchSnapshot(JSON.stringify(props));
    });
  });

  it('should render default slot properly', () => {
    const wrapper = mount(Button, { props: defaultProps, slots: { default: 'Button text' } });

    expect(wrapper.html()).toMatchSnapshot(`default slot`);
  });

  it('should render startIcon slot properly', () => {
    const wrapper = mount(Button, { props: defaultProps, slots: { default: 'Button text', startIcon: ExampleIcon } });

    expect(wrapper.html()).toMatchSnapshot(`startIcon slot`);
  });

  it('should render endIcon slot properly', () => {
    const wrapper = mount(Button, { props: defaultProps, slots: { endIcon: ExampleIcon } });

    expect(wrapper.html()).toMatchSnapshot(`endIcon slot`);
  });

  it('should render all slots properly', () => {
    const wrapper = mount(Button, {
      props: defaultProps,
      slots: { default: 'Button text', startIcon: ExampleIcon, endIcon: ExampleIcon },
    });

    expect(wrapper.html()).toMatchSnapshot(`endIcon slot`);
  });

  it('should check click action', () => {
    const wrapper = mount(Button, {
      attrs: {
        onclick: onClickMock,
      },
      props: defaultProps,
    });

    wrapper.trigger('click');
    expect(onClickMock).toBeCalledTimes(1);
  });
});
