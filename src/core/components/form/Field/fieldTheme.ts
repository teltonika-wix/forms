const base = /*tw*/ `
  rounded
  shadow
  text-base
  font-medium
  outline
  outline-1
  group
  -outline-offset-1

  focus-within:outline-2
  focus-within:-outline-offset-2
`;

const defaultColor = /*tw*/ `
  outline-grey-400
  hover:outline-grey-600
  focus-within:outline-blue-600
  hover:focus-within:outline-blue-600
  bg-white

  dark:bg-grey-800
  dark:text-white
  dark:outline-grey-600
  dark:hover:outline-grey-400
  dark:focus-within:outline-blue-600
  dark:hover:focus-within:outline-blue-600
`;

const error = /*tw*/ `
  outline-pink-700
  hover:outline-pink-500
  focus-within:outline-blue-600
  hover:focus-within:outline-blue-600
  bg-white

  dark:bg-grey-800
  dark:text-white
  dark:outline-pink-300
  dark:hover:outline-pink-500
  dark:focus-within:outline-blue-600
  dark:hover:focus-within:outline-blue-600
`;
const disabled = /*tw*/ `
  outline-grey-600
  bg-grey-200

  dark:text-grey-500
  dark:bg-grey-700
`;

const readOnly = `
  bg-grey-200
  text-grey-800
  outline-grey-400
  hover:outline-grey-400
  focus-within:outline-grey-400
  hover:focus-within:outline-grey-400

  dark:outline-grey-600
  dark:hover:outline-grey-600
  dark:focus-within:outline-grey-600
  dark:hover:focus-within:outline-grey-600
  dark:bg-grey-700
  dark:text-white
`;

type FieldThemeColor = {
  default: string;
  error: string;
  disabled: string;
  readOnly: string;
};
export type FieldThemeColorKeys = keyof FieldThemeColor;
const color: FieldThemeColor = {
  default: defaultColor,
  error,
  disabled,
  readOnly,
};

const defaultPaddings = /*tw*/ `
  px-3
  py-2
`;
const verticalSmall = /*tw*/ `
  px-3
  py-4
`;

type FieldThemePaddings = {
  default: string;
  verticalSmall: string;
};
export type FieldThemePaddingsKeys = keyof FieldThemePaddings;
const paddings: FieldThemePaddings = {
  default: defaultPaddings,
  verticalSmall,
};

export const FIELD_THEME = {
  base,
  variants: {
    color,
    paddings,
  },
};
