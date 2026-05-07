import { type Mock, describe, expect, it, vi } from "vitest";
import { isError } from "../../isError";
import { extractErrorMessage } from "../extractErrorMessage";

vi.mock("../../isError", () => ({
  isError: vi.fn(),
}));

const isErrorMock = isError as unknown as Mock;

describe("extractErrorMessage", () => {
  it("should return the error message for an Error instance", () => {
    const error = new Error("Something went wrong!");
    isErrorMock.mockReturnValue(true);

    const result = extractErrorMessage(error);

    expect(result).toBe("Something went wrong!");
    expect(isErrorMock).toHaveBeenCalledWith(error);
  });

  it("should return an empty string for an object that is not an instance of Error", () => {
    const error = { message: "This is an object with a message property" };
    isErrorMock.mockReturnValue(false);

    const result = extractErrorMessage(error);

    expect(result).toBe("");
    expect(isErrorMock).toHaveBeenCalledWith(error);
  });

  it("should return an empty string for null", () => {
    const error = null;
    isErrorMock.mockReturnValue(false);

    const result = extractErrorMessage(error);

    expect(result).toBe("");
    expect(isErrorMock).toHaveBeenCalledWith(error);
  });

  it("should return an empty string for undefined", () => {
    const error = undefined;
    isErrorMock.mockReturnValue(false);

    const result = extractErrorMessage(error);

    expect(result).toBe("");
    expect(isErrorMock).toHaveBeenCalledWith(error);
  });

  it("should return an empty string if the Error does not have a message", () => {
    const error = Object.create(Error.prototype);
    isErrorMock.mockReturnValue(true);

    const result = extractErrorMessage(error);

    expect(result).toBe("");
    expect(isErrorMock).toHaveBeenCalledWith(error);
  });
});
