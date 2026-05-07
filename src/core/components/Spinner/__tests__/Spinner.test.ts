import { mount } from '@vue/test-utils';
import Spinner from '../Spinner.vue';
import { spinnerSizes } from '../spinnerTheme';

const SIZES = Object.keys(spinnerSizes);

describe('Spinner Component', () => {
  it('renders properly', () => {
    const wrapper = mount(Spinner, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('works with different sizes', async () => {
    const wrapper = mount(Spinner, {});

    for (let i = 0; i <= SIZES.length; i++) {
      await wrapper.setProps({ size: SIZES[i] });
      expect(wrapper.html()).toMatchSnapshot();
    }
  });
});
