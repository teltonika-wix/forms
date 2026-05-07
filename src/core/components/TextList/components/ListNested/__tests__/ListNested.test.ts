import { mount } from '@vue/test-utils';
import { default as ListNested } from '../ListNested.vue';

describe('ListNested', () => {
  it('renders properly', () => {
    const wrapper = mount(ListNested, {
      shallow: true,
      props: {
        level: 1,
        punctuation: [],
        type: 'ordered',
        items: [
          {
            text: 'First layer',
            id: 1,
            items: [
              {
                text: 'Second layer',
                id: 11,
              },

              {
                text: 'Second layer second item',
                id: 12,
              },
            ],
          },
        ],
      },
    });

    expect(wrapper.html()).toMatchSnapshot('Multi level list');
  });
});
