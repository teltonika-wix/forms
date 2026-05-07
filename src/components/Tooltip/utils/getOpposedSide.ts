import { type Side } from "@floating-ui/vue";

export const opposedSide: Record<Side, Side> = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom",
};

export const getOpposedSide = (toolTipPlacement: Side): Side => {
  const placementKey: Side = toolTipPlacement;

  return opposedSide[placementKey];
};
