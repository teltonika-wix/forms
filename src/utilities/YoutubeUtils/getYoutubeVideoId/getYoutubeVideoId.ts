export const getYoutubeVideoId = (link: string): string => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = link
    .replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '')
    .match(regExp);

  return match && match[2]?.length === 11 ? match[2] : '';
};
