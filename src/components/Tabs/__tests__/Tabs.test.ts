import { mount } from '@vue/test-utils';
import { default as Tabs } from '../Tabs.vue';
import { default as TabsSlotMock } from './__mocks__/TabsSlotMock.vue';

describe('Tabs', () => {
  it('Renders properly with all props/slots provided', () => {
    const wrapper = mount(Tabs, {
      shallow: true,
      props: {
        activeTabName: 'second',
      },
      slots: {
        default: TabsSlotMock,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
