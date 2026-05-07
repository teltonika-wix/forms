import { type VariantProps, tv } from 'tailwind-variants';

export const base = `
  block 
  appearance-none 
  rounded-full 
  border 
  duration-200 
  
  before:pointer-events-none 
  before:absolute 
  before:left-1/2 
  before:top-1/2
  before:-translate-x-1/2 
  before:-translate-y-1/2 
  before:rounded-full 
  before:duration-200
`;

export const radioTheme = tv({
  base,

  variants: {
    size: {
      small: {
        base: 'size-4 before:size-2.5',
        inputContainer: 'size-6',
        label: 'text-xs',
      },

      medium: {
        base: 'size-6 before:size-4',
        inputContainer: 'size-8',
      },
    },

    isSelected: {
      true: 'border-blue-600 before:bg-blue-600 group-hover:border-blue-700 group-hover:before:bg-blue-700 dark:group-hover:border-blue-500 dark:group-hover:before:bg-blue-500',
      false: 'border-grey-400 group-hover:border-grey-600',
    },

    containerSize: {
      small: 'size-6',
      medium: 'size-8',
    },
  },

  defaultVariants: {
    size: 'small',
  },

  slots: {
    inputContainer: 'pointer-events-none relative inline-flex items-center justify-center',
    label: 'text-grey-600 dark:text-grey-400 cursor-pointer pr-0.5 pt-1 text-start',
  },
});

export const { defaultVariants } = radioTheme;

export type RadioSize = keyof typeof radioTheme.variants.size;

export type RadioThemeProps = VariantProps<typeof radioTheme>;
