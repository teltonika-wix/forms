export const isSuccessfulStatusCode = (status: number): boolean => {
  return status >= 200 && status < 300;
};
