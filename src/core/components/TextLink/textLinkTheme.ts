import { tv } from "tailwind-variants";

const linkBase = /*tw*/ `
  relative
  inline
  rounded-sm
  text-blue-600
  ring-blue-600
  ring-offset-2
  ring-offset-white
  focus:outline-none
  focus-visible:ring-2
  active:outline-none
  dark:text-white
  dark:ring-white
  dark:ring-offset-black
`;

export const underlineBase = /*tw*/ `
  before:absolute 
  before:right-0 
  before:bottom-0 
  before:h-px 
  before:w-0 
  before:bg-blue-600 
  before:duration-200 
  before:hover:left-0 
  hover:before:w-full 
  dark:before:bg-white
`;

const visitedStyles = /*tw*/ `
  visited:text-purple-500
  dark:visited:text-purple-500
  visited:before:bg-purple-500
  dark:visited:before:bg-purple-500
`;

export const textLinkTheme = tv({
  base: `${linkBase} ${underlineBase}`,
  variants: {
    visited: {
      enabled: visitedStyles,
    },
  },
});
