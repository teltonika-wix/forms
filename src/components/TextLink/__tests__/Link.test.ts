import { mount } from '@vue/test-utils';
import TextLink from '../TextLink.vue';
import ExampleLinkIcon from '../__mocks__/ExampleLinkIcon.vue';

describe('TextLink', () => {
  const url = 'https://www.google.com/';

  it('renders the component and matches snapshot, when text and icon is provided', () => {
    const wrapper = mount(TextLink, {
      props: { url },
      global: {
        components: {
          ExampleLinkIcon,
        },
      },
      slots: {
        default: `Hyperlink text <ExampleLinkIcon />`,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders the component and matches snapshot, when only text is provided', () => {
    const wrapper = mount(TextLink, {
      props: { url },
      slots: {
        default: 'Hyperlink text',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders the link with the correct href', () => {
    const wrapper = mount(TextLink, {
      props: { url },
    });
    expect(wrapper.find('a').attributes('href')).toBe(url);
  });

  it('conditionally applies visited styles based on prop', async () => {
    const wrapper = mount(TextLink, {
      props: { url, enableVisitedStyles: true },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('a').classes()).toContain('visited:text-purple-500');
  });
});
