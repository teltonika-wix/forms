import { describe, expect, it } from 'vitest';
import { getYoutubeVideoId } from '../getYoutubeVideoId';

describe('getYoutubeVideoId', () => {
  it('should create a Youtube thumb url', () => {
    const link = 'https://www.youtube.com/watch?v=nc4RSUPcRfA';

    const result = getYoutubeVideoId(link);
    expect(result).toBe('nc4RSUPcRfA');
  });
});
