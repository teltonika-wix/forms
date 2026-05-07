const base = /*tw*/ `
text-base
`;

const defaultColor = /*tw*/ `
text-grey-600
group-hover:text-grey-800
peer-has-[:focus]:text-blue-800

dark:text-grey-400
dark:group-hover:text-white
dark:peer-has-[:focus]:text-white
`;

const error = /*tw*/ `
text-pink-700
group-hover:text-pink-500

dark:text-pink-300
dark:group-hover:text-pink-300
`;

const disabled = /*tw*/ `
  text-grey-500
`;

export type InputLabelThemeColor = {
  default: string;
  error: string;
  disabled: string;
};
export type InputLabelThemeColorKeys = keyof InputLabelThemeColor;

const color: InputLabelThemeColor = {
  default: defaultColor,
  error,
  disabled,
};

export const INPUT_LABEL_THEME = {
  base,
  variants: {
    color,
  },
};
