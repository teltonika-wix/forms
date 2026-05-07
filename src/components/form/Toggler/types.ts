export type TogglerProps = {
  isDisabled?: boolean;
};
export type TogglerState = 'activeEnabled' | 'inactiveEnabled' | 'activeDisabled' | 'inactiveDisabled';

export interface TogglerVariants {
  state: TogglerState;
}

export interface TogglerThemeVariants {
  state: Record<TogglerState, string>;
}
