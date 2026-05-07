import { type SizesVariants } from "../types";

const sizesBreakpointsMap: Record<keyof SizesVariants, string> = {
  sm: "(min-width: 320px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1440px)",
};

export const formatSizes = (sizes: SizesVariants): string => {
  try {
    const breakpointsOrder: (keyof SizesVariants)[] = ["xl", "lg", "md", "sm"];

    const formattedSizes = breakpointsOrder
      .filter((key) => sizes[key])
      .map((key) => `${sizesBreakpointsMap[key]} ${sizes[key]}`)
      .join(", ");

    return `${formattedSizes}, 100vw`;
  } catch (error) {
    return "";
  }
};
