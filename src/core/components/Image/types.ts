export type ImageSizes = ('312' | '424' | '536' | '648' | '760' | '872' | '984' | '1096' | '1208' | '1320' | '1920')[];

export type BreakpointNames = 'sm' | 'md' | 'lg' | 'xl';

export type SizesVariants = {
  [key in BreakpointNames]?: string;
};

export type ImageProps = {
  src: string;
  alt: string;
  srcSetSizes?: ImageSizes;
  lazyLoad?: boolean;
  sizes?: SizesVariants;
  width?: string;
  height?: string;
};
