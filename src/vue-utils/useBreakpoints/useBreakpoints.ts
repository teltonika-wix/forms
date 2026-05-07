import { useBreakpoints as useVueUseBreakpoints } from "@vueuse/core";
import type { UseBreakpointsReturn } from "./types";

const screens = {
  sm: "320px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
};

export const useBreakpoints = (): UseBreakpointsReturn => {
  const { greater } = useVueUseBreakpoints(screens);

  const isGreaterThanSm = greater(() => "sm");
  const isGreaterThanMd = greater(() => "md");
  const isGreaterThanLg = greater(() => "lg");
  const isGreaterThanXl = greater(() => "xl");

  return {
    isGreaterThanSm,
    isGreaterThanMd,
    isGreaterThanLg,
    isGreaterThanXl,
  };
};
