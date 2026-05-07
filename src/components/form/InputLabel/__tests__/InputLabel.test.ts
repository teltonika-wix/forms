import { mount } from '@vue/test-utils';
import InputLabel from '../InputLabel.vue';

describe('Input label', () => {
  it('Should render without any props', () => {
    const wrapper = mount(InputLabel, {
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot('Default props');
  });

  it('Should render as error label', () => {
    const wrapper = mount(InputLabel, {
      props: {
        error: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Error label');
  });

  it('Should render as disabled label', () => {
    const wrapper = mount(InputLabel, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Error label');
  });

  it('Should render as label with for=... attribute', () => {
    const wrapper = mount(InputLabel, {
      props: {
        labelFor: 'input-id',
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Error label');
  });
});
