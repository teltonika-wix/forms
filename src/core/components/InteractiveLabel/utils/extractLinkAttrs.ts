import type { AnchorHTMLAttributes } from "vue";

export type LinkData = {
  external?: boolean;
  url: string;
  documentTarget?: "_blank" | "_self" | "_parent" | "_top";
  relationship?: string;
};

export const extractLinkAttrs = ({
  external,
  url,
  documentTarget,
  relationship,
}: LinkData): AnchorHTMLAttributes => {
  if (external) {
    return {
      target: "_blank",
      rel: "noopener noreferrer",
      href: url,
    };
  }

  return { href: url, target: documentTarget, rel: relationship };
};
