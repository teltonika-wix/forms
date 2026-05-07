import { type VariantProps, tv } from 'tailwind-variants';

const buttonLarge = /*tw*/ `group-[.fixed]:md:px-4 group-[.fixed]:md:py-8 md:text-xl md:leading-8 md:py-4 md:px-8`;
const buttonMedium = /*tw*/ `group-[.fixed]:md:px-4 group-[.fixed]:md:py-6 md:py-4 md:px-6`;
const buttonSmall = /*tw*/ `group-[.fixed]:md:px-2.5 group-[.fixed]:md:py-6 md:text-base md:leading-5 md:py-2.5 md:px-6`;

export const base = /*tw*/ `
  font-oswald
  flex
  justify-center
  items-center
  rounded
  font-medium
  text-white
  py-3
  px-4
  text-lg
  leading-6
  w-full
  md:w-auto

  focus-within:[&:not(:disabled)]:outline
  focus:[&:not(:disabled)]:outline
  active:[&:not(:disabled)]:outline

  focus-within:outline-2
  focus:outline-2
  active:outline-2

  uppercase
  transition-colors
  duration-200

  group-[.fixed]:transform
  group-[.fixed]:rotate-180
  group-[.fixed]:rounded-l-none
  group-[.fixed]:px-3 group-[.fixed]:py-4
`;

const primary = /*tw*/ `
  bg-blue-600
  text-white

  hover:bg-blue-800

  focus-within:outline-electric-500
  focus:outline-electric-500
  active:outline-electric-500

  focus-within:bg-blue-800
  focus:bg-blue-800
  active:bg-blue-800
`;

const secondary = /*tw*/ `
  bg-blue-800
  text-white

  hover:bg-blue-600

  focus-within:outline-electric-500
  focus:outline-electric-500
  active:outline-electric-500

  focus-within:bg-blue-600
  focus:bg-blue-600
  active:bg-blue-600
`;

const accent = /*tw*/ `
  bg-electric-500
  text-grey-900

  hover:bg-electric-300

  focus-within:outline-blue-600
  focus:outline-blue-600
  active:outline-blue-600

  focus-within:bg-electric-500
  focus:bg-electric-500
  active:bg-electric-500
`;

const white = /*tw*/ `
  bg-white
  text-blue-700

  hover:bg-grey-600
  hover:text-white

  focus-within:text-white
  focus:text-white
  active:text-white

  focus-within:outline-electric-500
  focus:outline-electric-500
  active:outline-electric-500

  focus-within:bg-grey-600
  focus:bg-grey-600
  active:bg-grey-600
`;

const outlinedStyles = /*tw*/ `
  bg-transparent
  text-grey-600

  hover:bg-grey-600
  hover:text-white

  focus-within:text-white
  focus:text-white
  active:text-white

  focus-within:outline-electric-500
  focus:outline-electric-500
  active:outline-electric-500

  focus-within:bg-grey-600
  focus:bg-grey-600
  active:bg-grey-600

  shadow-[inset_0_0_0_1px_theme('colors.grey.600')]
`;

const outlinedWhite = /*tw*/ `
  bg-transparent
  text-white

  hover:bg-white
  hover:text-blue-800

  focus-within:text-blue-800
  focus:text-blue-800
  active:text-blue-800

  focus-within:outline-electric-500
  focus:outline-electric-500
  active:outline-electric-500

  focus-within:bg-white
  focus:bg-white
  active:bg-white

   shadow-[inset_0_0_0_1px_theme('colors.white')]
`;

export const buttonTheme = tv({
  base,
  variants: {
    color: {
      primary,
      secondary,
      accent: accent,
      white,
      outlined: outlinedStyles,
      'outlined-white': outlinedWhite,
    },
    disabled: {
      true: 'pointer-events-none select-none',
    },
    size: {
      large: buttonLarge,
      medium: buttonMedium,
      small: buttonSmall,
    },
    width: {
      full: /*tw*/ `md:w-full`,
      auto: /*tw*/ `md:w-auto`,
    },
    isButtonText: {
      true: {
        startIcon: '-ml-1',
        endIcon: '-mr-1',
      },
    },
  },
  compoundVariants: [
    {
      disabled: true,
      color: 'primary',
      class: 'bg-grey-400',
    },
    {
      disabled: true,
      color: 'secondary',
      class: 'bg-grey-400',
    },
    {
      disabled: true,
      color: 'accent',
      class: 'bg-electric-100 text-grey-600',
    },
    {
      disabled: true,
      color: 'white',
      class: 'bg-wh text-grey-400',
    },
    {
      disabled: true,
      color: 'outlined',
      class: 'text-grey-400 border-grey-400 bg-transparent',
    },
    {
      disabled: true,
      color: 'outlined-white',
      class: 'bg-transparent text-white',
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'large',
    width: 'auto',
    disabled: false,
  },
  slots: {
    startIcon: /*tw*/ `-my-0.5 inline-flex [&+*]:pl-2 [&>svg>path]:stroke-current`,
    buttonText: /*tw*/ `inline-flex [&+*]:pl-2`,
    endIcon: /*tw*/ `-my-0.5 inline-flex text-inherit [&>svg>path]:stroke-current`,
  },
});

export const { defaultVariants } = buttonTheme;

export type ButtonColor = keyof typeof buttonTheme.variants.color;
export type ButtonSize = keyof typeof buttonTheme.variants.size;
export type ButtonWidth = keyof typeof buttonTheme.variants.width;

export type TButtonThemeProps = VariantProps<typeof buttonTheme>;
