import type { CheckboxProps, CheckboxValueChange } from './types';
import { type Ref, ref } from 'vue';

export type UseCheckboxParams = {
  value: CheckboxProps['value'];
  onChange: CheckboxValueChange;
};

export type UseCheckboxReturn = {
  handleChange: (event: Event) => void;
  isChecked: Ref<boolean>;
};

export const useCheckbox = ({ value, onChange }: UseCheckboxParams): UseCheckboxReturn => {
  const isChecked = ref(!!value);

  const handleChange = (event: Event): void => {
    if (!event || !event.target || !(event.target instanceof HTMLInputElement)) {
      return;
    }

    const { checked } = event.target;
    isChecked.value = checked;
    onChange(event, checked);

    return;
  };

  return {
    handleChange,
    isChecked,
  };
};
