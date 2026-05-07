export const getUrlFromString = (urlString: string): URL | null => {
  try {
    return urlString ? new URL(urlString) : null;
  } catch (error) {
    return null;
  }
};
