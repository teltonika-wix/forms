import { getYoutubeVideoId } from "../getYoutubeVideoId";

export const getYoutubeEmbeddedUrl = (
  url: string,
  autoplay = true,
  enablejsapi = false,
): string => {
  const videoID = getYoutubeVideoId(url);
  let link = `https://www.youtube.com/embed/${videoID}`;

  if (autoplay) {
    link = `https://www.youtube.com/embed/${videoID}?autoplay=1`;
  }

  if (enablejsapi) {
    link = autoplay ? `${link}&enablejsapi=1` : `${link}?enablejsapi=1`;
  }

  return link;
};
