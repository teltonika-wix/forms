import { mount } from '@vue/test-utils';
import { default as TabsScroll } from '../TabsScroll.vue';

describe('TabsScroll', () => {
  it('Renders properly with all props provided', () => {
    const wrapper = mount(TabsScroll, {
      shallow: true,
      props: {
        tabs: [
          {
            blockId: 'first-target',
            text: 'Scroll to first target',
          },

          {
            blockId: 'second-target',
            text: 'Scroll to second target',
          },

          {
            blockId: 'third-target',
            text: 'Scroll to third target',
          },
        ],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
