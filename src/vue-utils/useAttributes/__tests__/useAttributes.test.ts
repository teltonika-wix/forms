import { type Mock, vi } from 'vitest';
import { useAttributes } from './../useAttributes';
import { useAttrs } from 'vue';

vi.mock('vue', () => {
  return {
    useAttrs: vi.fn(),
  };
});

const useAttrsMock = useAttrs as Mock;

describe('useAttributes composable', () => {
  it('1 correctly handles attrs from useAttrs with no defaultAttributes', () => {
    useAttrsMock.mockReturnValueOnce({
      tabindex: '88',
      'aria-label': 'aria label from useAttrs',
    });

    const mergedAttributes = useAttributes({});

    expect(mergedAttributes).toEqual({
      tabindex: '88',
      'aria-label': 'aria label from useAttrs',
    });
  });

  it('2 correctly handles defaultAttributes with no attrs from useAttrs', () => {
    useAttrsMock.mockReturnValueOnce({});

    const defaultAttributes = {
      tabindex: '99',
      'aria-label': 'aria label from default',
    };

    const mergedAttributes = useAttributes(defaultAttributes);

    expect(mergedAttributes).toEqual(defaultAttributes);
  });

  it('3 correctly merges defaultAttributes with attrs from useAttrs', () => {
    useAttrsMock.mockReturnValueOnce({
      tabindex: '88',
      'aria-label': 'aria label',
    });

    const defaultAttributes = {
      tabindex: '0',
      'aria-label': 'default aria label',
      'data-custom': 'custom data attribute',
    };

    const mergedAttributes = useAttributes(defaultAttributes);

    expect(mergedAttributes).toEqual({
      tabindex: '88',
      'aria-label': 'aria label',
      'data-custom': 'custom data attribute',
    });
  });
});
