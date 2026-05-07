import { isString } from "../isString";

const array = [1, 2, 3, 4, 5, 6];
const object = { key1: "value1", foo: "bar", one: 1 };
const uint8Array = new Uint8Array([1, 2, 3, 4, 5, 6]);

describe("isString", () => {
  it("should correctly validates string", () => {
    expect(isString(array)).toBe(false);
    expect(isString(object)).toBe(false);
    expect(isString(uint8Array)).toBe(false);
    expect(isString("array")).toBe(true);
  });

  it("should correctly validates empty string", () => {
    expect(isString("", true)).toBe(true);
    expect(isString("", false)).toBe(false);
  });
});
