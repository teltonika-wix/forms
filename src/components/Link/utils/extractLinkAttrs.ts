import type { LinkData } from '../types';
import type { AnchorHTMLAttributes } from 'vue';

export const extractLinkAttrs = ({
  external,
  url,
  documentTarget,
  relationship,
  ariaLabel,
}: LinkData): AnchorHTMLAttributes => {
  const baseAttrs: AnchorHTMLAttributes = {
    href: url,
  };

  if (documentTarget) {
    baseAttrs.target = documentTarget;
  }

  if (relationship) {
    baseAttrs.rel = relationship;
  }

  if (external) {
    baseAttrs.target = '_blank';
    baseAttrs.rel = 'noopener noreferrer';
  }

  if (ariaLabel) {
    baseAttrs['aria-label'] = ariaLabel;
  }

  return baseAttrs;
};
