import type { FieldProps } from 'src/legacy/core/components/form/Field';
import type { SelectMenuOption } from './components/SelectMenuDropdown';

export type SelectMenuProps = FieldProps & {
  defaultValue?: SelectMenuOption;
  error?: string;
  label?: string;
  selectMenuOptions: SelectMenuOption[];
  placeholder?: string;
  name?: string;
  id?: string;
  search?: boolean;
};
