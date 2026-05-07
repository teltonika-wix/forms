export const getUrlFromBrowser = (): URL | null => {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    return new URL(window.location.href);
  } catch (error) {
    return null;
  }
};
