import { describe, expect, it } from 'vitest';
import { isKeyInObject } from '../isKeyInObject';

describe('isKeyInObject', () => {
  it('should return true if the key exists in the object', () => {
    const obj = { name: 'Alice', age: 25 };
    const result = isKeyInObject('name', obj);
    expect(result).toBe(true);
  });

  it('should return false if the key does not exist in the object', () => {
    const obj = { name: 'Alice', age: 25 };
    const result = isKeyInObject('height', obj);
    expect(result).toBe(false);
  });

  it('should return false for undefined object', () => {
    const result = isKeyInObject('name', undefined as unknown as object);
    expect(result).toBe(false);
  });

  it('should handle non-string keys', () => {
    const obj = { 1: 'one', 2: 'two' };
    const result = isKeyInObject(1, obj);
    expect(result).toBe(true);
  });

  it('should return false for null object', () => {
    const result = isKeyInObject('name', null as unknown as object);
    expect(result).toBe(false);
  });
});
