import type { VariantProps } from 'tailwind-variants';
import type { feedbackTheme } from './feedbackTheme';

export type FeedbackThemeProps = VariantProps<typeof feedbackTheme>;

export type FeedbackProps = {
  error?: string;
  id?: string;
  name?: string;
  modelValue?: number;
};

export type FeedbackValueChange = (value: number) => void;

export type FeedbackEmits = {
  onValueChange: Parameters<FeedbackValueChange>;
};
