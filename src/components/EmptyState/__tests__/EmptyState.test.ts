import { mount } from '@vue/test-utils';
import EmptyState from './../EmptyState.vue';

describe('Spinner Component', () => {
  it('renders properly', () => {
    const wrapper = mount(EmptyState, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('works with different props', async () => {
    const wrapper = mount(EmptyState, {});
    await wrapper.setProps({ title: 'Placeholder Text' });
    expect(wrapper.html()).toMatchSnapshot();
    await wrapper.setProps({ description: 'Placeholder Description' });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
