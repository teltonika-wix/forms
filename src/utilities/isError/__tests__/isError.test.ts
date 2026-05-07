import { describe, expect, it } from 'vitest';
import { isError } from '../isError';

describe('isError', () => {
  it('should return true for an instance of Error', () => {
    const error = new Error('This is an error');
    expect(isError(error)).toBe(true);
  });

  it('should return false for a undefined', () => {
    const error = undefined;
    expect(isError(error)).toBe(false);
  });

  it('should return false for an object that is not an instance of Error', () => {
    const error = { message: 'This is an object with a message property' };
    expect(isError(error)).toBe(false);
  });
});
