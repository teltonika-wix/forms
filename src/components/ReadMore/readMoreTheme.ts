import { tv } from "tailwind-variants";

export const base = /*tw*/ `
  relative
  rounded-sm 
  inline-flex 
  cursor-pointer 
  items-center 
  gap-2 
  border-2
  border-transparent
  p-0.5
  text-blue-600
  focus:outline-none 
  focus-visible:border-blue-600
`;

const withArrow = /*tw*/ `
  hover:text-blue-800 
`;

const withoutArrow = /*tw*/ `
  hover:text-blue-700
  
  before:absolute 
  before:left-[0.125rem]
  before:bottom-[0.125rem]
  before:h-px 
  before:w-[calc(100%-0.25rem)]
  before:bg-blue-600 
  before:duration-200 
  hover:before:bg-blue-700
`;

export const READ_MORE_TV_THEME = {
  base,
  variants: {
    type: {
      withArrow,
      withoutArrow,
    },
  },
  defaultVariants: {
    type: "withArrow",
  },
} as const;

export const readMoreTheme = tv(READ_MORE_TV_THEME);
export const { defaultVariants } = READ_MORE_TV_THEME;

export type ReadMoreType = keyof typeof READ_MORE_TV_THEME.variants.type;
