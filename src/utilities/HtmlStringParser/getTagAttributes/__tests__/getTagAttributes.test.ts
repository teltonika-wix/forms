import { describe, expect, it } from 'vitest';
import { getTagAttributes } from '../getTagAttributes';

describe('getTagAttributes', () => {
  it('should extract a single attribute', () => {
    const htmlString = '<img src="image.jpg">';
    const result = getTagAttributes(htmlString);
    expect(result).toEqual({ src: 'image.jpg' });
  });

  it('should extract multiple attributes', () => {
    const htmlString = '<img src="image.jpg" alt="A description">';
    const result = getTagAttributes(htmlString);
    expect(result).toEqual({ src: 'image.jpg', alt: 'A description' });
  });

  it('should handle single quotes for attribute values', () => {
    const htmlString = "<img src='image.jpg' alt='A description'>";
    const result = getTagAttributes(htmlString);
    expect(result).toEqual({ src: 'image.jpg', alt: 'A description' });
  });

  it('should return an empty object if no attributes are present', () => {
    const htmlString = '<img>';
    const result = getTagAttributes(htmlString);
    expect(result).toEqual({});
  });

  it('should handle attributes with no value correctly', () => {
    const htmlString = '<input type="text" disabled>';
    const result = getTagAttributes(htmlString);
    expect(result).toEqual({ type: 'text', disabled: undefined });
  });

  it('should return an empty object for malformed tags', () => {
    const htmlString = '<img src="image.jpg';
    const result = getTagAttributes(htmlString);
    expect(result).toEqual({});
  });
});
