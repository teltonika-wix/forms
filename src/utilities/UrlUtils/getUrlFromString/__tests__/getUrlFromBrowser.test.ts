import { describe, expect, it } from 'vitest';
import { getUrlFromString } from '../getUrlFromString';

describe('getUrlFromString', () => {
  it('should return a URL object for a valid URL string', () => {
    const urlString = 'https://example.com/';
    const result = getUrlFromString(urlString);

    expect(result).toBeInstanceOf(URL);
    expect(result?.href).toBe(urlString);
  });

  it('should return null for an invalid URL string', () => {
    const urlString = 'invalid-url';
    const result = getUrlFromString(urlString);

    expect(result).toBeNull();
  });

  it('should return null for an empty string', () => {
    const urlString = '';
    const result = getUrlFromString(urlString);

    expect(result).toBeNull();
  });

  it('should return null for undefined input', () => {
    const result = getUrlFromString(undefined as unknown as string); // Cast undefined to string type

    expect(result).toBeNull();
  });

  it('should handle exceptions and return null when an error occurs', () => {
    const invalidUrlString = '----'; // Set up a URL that will throw an error

    const result = getUrlFromString(invalidUrlString);

    expect(result).toBeNull();
  });
});
