import { getYoutubeVideoId } from '../getYoutubeVideoId';

export const getYoutubeThumbUrl = (link: string, resolution = 'maxresdefault'): string => {
  const videoID = getYoutubeVideoId(link);

  return `https://img.youtube.com/vi_webp/${videoID}/${resolution}.webp`;
};
