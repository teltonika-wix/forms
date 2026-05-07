export type OverrideObject<Original, Override> = {
  [Key in keyof Original]: Key extends keyof Override ? Override[Key] : Original[Key];
};
