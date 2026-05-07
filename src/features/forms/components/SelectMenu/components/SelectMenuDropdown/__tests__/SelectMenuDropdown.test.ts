import { mount } from '@vue/test-utils';
import { type Mock, beforeEach, vi } from 'vitest';
import SelectMenuDropdown from '../SelectMenuDropdown.vue';
import { useMenuFloating } from '../composables/useMenuFloating';
import { useMenuVisibility } from '../composables/useMenuVisibility';
import type { SelectMenuOption } from '../types';

vi.mock('../composables/useMenuFloating', () => ({
  useMenuFloating: vi.fn(),
}));
vi.mock('../composables/useMenuVisibility', () => ({
  useMenuVisibility: vi.fn(),
}));

const useMenuFloatingMock = useMenuFloating as Mock;
const baseUseMenuFloatingParams = { isMenuVisible: true, hideMenu: vi.fn(), toggleMenuVisibility: vi.fn() };

const useMenuVisibilityMock = useMenuVisibility as Mock;
const baseUseMenuVisibilityParams = { menuOpenerRef: vi.fn(), menuContainerRef: vi.fn(), floatingStyles: vi.fn() };

const selectMenuOptions: SelectMenuOption[] = [
  { label: 'Option 1', value: 'option_1' },
  { label: 'Option 2', value: 'option_2' },
  { label: 'Option 3', value: 'option_3' },
  { label: 'Option 4', value: 'option_4' },
  { label: 'Option 5', value: 'option_5' },
  { label: 'Option 6', value: 'option_6' },
  { label: 'Option 7', value: 'option_7' },
  { label: 'Option 8', value: 'option_8' },
];

beforeEach(async () => {
  useMenuFloatingMock.mockReturnValue(baseUseMenuFloatingParams);
  useMenuVisibilityMock.mockReturnValue(baseUseMenuVisibilityParams);
});

describe('SelectMenuDropdown', () => {
  it('Should check base rendering', () => {
    const wrapper = mount(SelectMenuDropdown, {
      props: { selectMenuOptions, disabled: false },
      shallow: true,
    });

    expect(wrapper.html()).toMatchSnapshot('Default props');
  });
});
