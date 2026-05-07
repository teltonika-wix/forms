import { describe, expect, it } from 'vitest';
import { getInnerContent } from '../getInnerContent';

describe('getInnerContent', () => {
  it('should extract inner content from a simple tag', () => {
    const htmlString = '<div>Hello, World!</div>';
    const result = getInnerContent({ stringWithHtml: htmlString, tagName: 'div' });
    expect(result).toBe('Hello, World!');
  });

  it('should return an empty string if the tag is not found', () => {
    const htmlString = '<div>Hello, World!</div>';
    const result = getInnerContent({ stringWithHtml: htmlString, tagName: 'span' });
    expect(result).toBe('');
  });

  it('should return an empty string if the tag has no inner content', () => {
    const htmlString = '<div></div>';
    const result = getInnerContent({ stringWithHtml: htmlString, tagName: 'div' });
    expect(result).toBe('');
  });

  it('should extract content even with nested tags inside', () => {
    const htmlString = '<div><span>Nested content</span> Outer content</div>';
    const result = getInnerContent({ stringWithHtml: htmlString, tagName: 'div' });
    expect(result).toBe('<span>Nested content</span> Outer content');
  });

  it('should extract only the first occurrence of a tag', () => {
    const htmlString = '<div>First instance</div><div>Second instance</div>';
    const result = getInnerContent({ stringWithHtml: htmlString, tagName: 'div' });
    expect(result).toBe('First instance');
  });

  it('should work with different tags like paragraph <p>', () => {
    const htmlString = '<p>This is a paragraph.</p>';
    const result = getInnerContent({ stringWithHtml: htmlString, tagName: 'p' });
    expect(result).toBe('This is a paragraph.');
  });
});
