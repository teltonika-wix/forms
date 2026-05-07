import type { documentTargets } from "./constants";

export type DocumentTarget = (typeof documentTargets)[number];

export type LinkData = {
  external?: boolean;
  url: string;
  documentTarget?: DocumentTarget;
  relationship?: string;
  ariaLabel?: string;
};
