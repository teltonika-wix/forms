import { describe, expect, it } from 'vitest';
import { getYoutubeEmbeddedUrl } from '../getYoutubeEmbeddedUrl';

describe('getYoutubeEmbeddedUrl', () => {
  it('should create a embed Youtube url', () => {
    const link = 'https://www.youtube.com/watch?v=nc4RSUPcRfA';

    const result = getYoutubeEmbeddedUrl(link);
    expect(result).toBe('https://www.youtube.com/embed/nc4RSUPcRfA?autoplay=1');
  });

  it('should create a embed Youtube url if autoplay is false', () => {
    const link = 'https://www.youtube.com/watch?v=nc4RSUPcRfA';

    const result = getYoutubeEmbeddedUrl(link, false);
    expect(result).toBe('https://www.youtube.com/embed/nc4RSUPcRfA');
  });

  it('should create a embed Youtube url if autoplay is false and enablejsapi is true', () => {
    const link = 'https://www.youtube.com/watch?v=nc4RSUPcRfA';

    const result = getYoutubeEmbeddedUrl(link, false, true);
    expect(result).toBe('https://www.youtube.com/embed/nc4RSUPcRfA?enablejsapi=1');
  });

  it('should create a embed Youtube url if autoplay is true and enablejsapi is true', () => {
    const link = 'https://www.youtube.com/watch?v=nc4RSUPcRfA';

    const result = getYoutubeEmbeddedUrl(link, true, true);
    expect(result).toBe('https://www.youtube.com/embed/nc4RSUPcRfA?autoplay=1&enablejsapi=1');
  });
});
