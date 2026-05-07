export type SpinnerSizes = "small" | "medium" | "large";

export type Sizes<T> = {
  [key in SpinnerSizes]: T;
};

export type SpinnerProps = {
  size?: SpinnerSizes;
};
