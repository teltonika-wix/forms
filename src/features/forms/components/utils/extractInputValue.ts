export const extractInputValue = (event: Event): string | undefined => {
  if (event.target && 'value' in event.target && typeof event.target.value === 'string') {
    return event.target.value;
  }

  return undefined;
};
