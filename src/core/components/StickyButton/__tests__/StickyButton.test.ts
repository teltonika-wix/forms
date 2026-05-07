import { mount } from '@vue/test-utils';
import StickyButton from '../StickyButton.vue';
import { nextTick } from 'vue';

describe('StickyButton', () => {
  it('should test rendering before mounted', () => {
    const wrapper = mount(StickyButton, {
      slots: {
        default: 'Contact Us',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should test render after mounted', async () => {
    const wrapper = mount(StickyButton, {
      slots: {
        default: 'Contact Us',
      },
    });

    await nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.text()).toBe('Contact Us');
  });
});
