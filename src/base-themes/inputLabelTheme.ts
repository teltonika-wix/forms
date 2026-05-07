const base = `
  text-xs  
`;

const defaultColor = `
text-grey-800  
group-has-[input:focus]:text-blue-800
`;

const error = `
  text-pink-700
`;

const disabled = `
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
