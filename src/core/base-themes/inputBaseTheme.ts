const base = `
  border
  rounded
  shadow
  text-base
  font-medium

  focus:outline
  active:outline
  focus-visible:outline

  outline-2
  focus:outline-2
  active:outline-2
  focus-visible:outline-2
  duration-200
`;

const defaultColor = `
  border-gray-400
  hover:border-gray-600
  bg-white
  text-gray-800
  outline-blue-600


  focus:hover:border-blue-600
  active:hover:border-blue-600
  focus-visible:hover:border-blue-600

  dark:border-gray-600
  dark:bg-gray-800
  dark:hover:border-gray-400
  dark:text-gray-400

  dark:outline-blue-600

  dark:focus:hover:border-blue-600
  dark:active:hover:border-blue-600
  dark:focus-visible:hover:border-blue-600
`;
const error = `
  border-pink-700
  bg-white
  text-gray-600
  outline-blue-600

  hover:border-pink-500

  focus:hover:border-blue-600
  active:hover:border-blue-600
  focus-visible:hover:border-blue-600

  focus:border-blue-600
  active:border-blue-600
  focus-visible:border-blue-600

  dark:bg-gray-800
  dark:text-gray-400
`;
const disabled = `
  disabled:border-gray-400
  disabled:bg-gray-200

  dark:disabled:border-gray-600
  dark:disabled:bg-gray-700
  disabled:text-gray-500
  disabled:opacity-100
`;
const readOnly = `
  border-gray-400
  bg-gray-200
  text-gray-800
  outline-0

  dark:border-gray-600
  dark:bg-gray-700
  dark:text-white
`;

const defaultVerticalSpaces = `
  py-4
`;
const spaceTop = `
  pb-2
  pt-6
`;

const defaultHorizontalSpaces = `
  px-3
`;
const spaceRight = `
  pl-3
  pr-10
`;

// Input colors (input's state identifier)
export type InputBaseThemeColor = {
  default: string;
  error: string;
  disabled: string;
  readOnly: string;
};
export type InputBaseThemeColorKeys = keyof InputBaseThemeColor;
const color: InputBaseThemeColor = {
  default: defaultColor,
  error,
  disabled,
  readOnly,
};

// Spacing for input label
export type InputBaseThemeVerticalSpaces = {
  defaultVerticalSpaces: string;
  spaceTop: string;
};
export type InputBaseThemeVerticalSpacesKeys = keyof InputBaseThemeVerticalSpaces;
const labelSpace: InputBaseThemeVerticalSpaces = {
  defaultVerticalSpaces,
  spaceTop,
};

// Spacing for icons, tooltips, etc...
export type InputBaseThemeHorizontalSpaces = {
  defaultHorizontalSpaces: string;
  spaceRight: string;
};
export type InputBaseThemeHorizontalSpacesKeys = keyof InputBaseThemeHorizontalSpaces;
const horizontalSpaces: InputBaseThemeHorizontalSpaces = {
  spaceRight,
  defaultHorizontalSpaces,
};

export const INPUT_BASE_THEME = {
  base,
  variants: {
    color,
    labelSpace,
    horizontalSpaces,
  },
};
