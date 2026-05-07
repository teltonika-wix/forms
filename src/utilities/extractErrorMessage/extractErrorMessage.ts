import { isError } from "../isError";

export const extractErrorMessage = (error: unknown): string => {
  if (!isError(error) || !error.message) {
    return "";
  }

  return error.message;
};
