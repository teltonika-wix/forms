import { type ImageSizes } from "../types";

export type FormatSrcSetParams = { src: string; srcSetSizes?: ImageSizes };

export const formatSrcSet = ({ src, srcSetSizes }: FormatSrcSetParams): string => {
  try {
    if (!srcSetSizes) {
      return "";
    }

    const urlObj = new URL(src);
    const srcSet = srcSetSizes.map((size) => {
      urlObj.searchParams.set("width", size);

      return `${urlObj.toString()} ${size}w`;
    });

    return srcSet.join(", ");
  } catch (error) {
    return "";
  }
};
