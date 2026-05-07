import { mount } from '@vue/test-utils';
import ExternalHyperlink from '../ExternalHyperlink.vue';

describe('ExternalHyperlink', () => {
  const url = 'https://www.google.com/';

  it('renders the component and matches snapshot, when text is provided', () => {
    const wrapper = mount(ExternalHyperlink, {
      props: { url },
      slots: {
        default: `ExternalHyperlink text`,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders the link with the correct href', () => {
    const wrapper = mount(ExternalHyperlink, {
      props: { url },
    });
    expect(wrapper.find('a').attributes('href')).toBe(url);
  });

  it('conditionally applies visited styles based on prop', async () => {
    const wrapper = mount(ExternalHyperlink, {
      props: { url, enableVisitedStyles: true },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('a').classes()).toContain('visited:text-purple-500');
  });
});
