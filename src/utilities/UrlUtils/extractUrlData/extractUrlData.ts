import { getUrlFromBrowser } from '../getUrlFromBrowser';
import { getUrlFromString } from '../getUrlFromString';

export type UrlData = {
  baseUrl: string;
  fullUrl: string;
};

export const extractUrlData = (urlString?: string): UrlData => {
  const urlInstance = urlString ? getUrlFromString(urlString) : getUrlFromBrowser();

  if (!urlInstance || !urlInstance.href) {
    return { baseUrl: '', fullUrl: '' };
  }

  const baseUrl = urlInstance.origin;
  const fullUrl = urlInstance.href;

  return { baseUrl, fullUrl };
};
