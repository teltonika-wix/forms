import { type ImageProps } from '../types';
import { formatSizes } from './formatSizes';
import { formatSrcSet } from './formatSrcSet';
import { type ImgHTMLAttributes } from 'vue';

export const setImageAttributes = ({
  src,
  srcSetSizes,
  alt,
  lazyLoad,
  sizes,
  width,
  height,
}: ImageProps): ImgHTMLAttributes => {
  const attributes: ImgHTMLAttributes = {
    src,
    alt,
  };

  if (lazyLoad) {
    attributes['loading'] = 'lazy';
  }

  if (width) {
    attributes['width'] = width;
  }

  if (height) {
    attributes['height'] = height;
  }

  const formattedSrcSet = formatSrcSet({ src, srcSetSizes });

  if (!formattedSrcSet) {
    return attributes;
  }

  attributes['srcset'] = formattedSrcSet;

  if (srcSetSizes?.length && sizes) {
    const formattedSizes = formatSizes(sizes);

    if (formattedSizes) {
      attributes['sizes'] = formattedSizes;
    }
  }

  return attributes;
};
