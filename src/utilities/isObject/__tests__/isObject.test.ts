import { isObject } from '../isObject';

const array = [1, 2, 3, 4, 5, 6];
const object = { key1: 'value1', foo: 'bar', baz: 1 };
const uint8Array = new Uint8Array([1, 2, 3, 4, 5, 6]);

describe('isObject', () => {
  it('should correctly identifies Objects', () => {
    expect(isObject(array)).toBe(false);
    expect(isObject(object)).toBe(true);
    expect(isObject(uint8Array)).toBe(false);
    expect(isObject('array')).toBe(false);
  });
});
