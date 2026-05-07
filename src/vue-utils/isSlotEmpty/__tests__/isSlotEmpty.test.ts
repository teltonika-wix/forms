import { mount } from '@vue/test-utils';
import { isSlotEmpty } from '../isSlotEmpty';

describe('isSlotEmpty', () => {
  it('should return true if slot is empty', () => {
    const slot = mount({
      template: '<div></div>',
    });

    expect(isSlotEmpty(slot.vm.$slots['default'])).toBe(true);
  });

  it('should return false if slot is not empty', () => {
    const slot = mount(
      {
        template: '<div><slot/></div>',
      },
      {
        slots: {
          default: '<div>Content</div>',
        },
      },
    );

    expect(isSlotEmpty(slot.vm.$slots['default'])).toBe(false);
  });
});
