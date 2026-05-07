import { type Mock, vi } from 'vitest';
import { getUrlFromBrowser } from '../../getUrlFromBrowser';
import { getUrlFromString } from '../../getUrlFromString';
import { extractUrlData } from '../extractUrlData';

vi.mock('../../getUrlFromBrowser');
vi.mock('../../getUrlFromString');

const getUrlFromBrowserMock = getUrlFromBrowser as Mock;
const getUrlFromStringMock = getUrlFromString as Mock;

const baseUrlMock = 'https://example.com';
const fullUrlMock = 'https://example.com/path?query=1';

describe('extractUrlData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return baseUrl and fullUrl from getUrlFromBrowser', () => {
    const mockUrl = new URL(fullUrlMock);
    getUrlFromBrowserMock.mockReturnValueOnce(mockUrl);

    const result = extractUrlData();

    expect(result).toEqual({
      baseUrl: baseUrlMock,
      fullUrl: fullUrlMock,
    });
    expect(getUrlFromBrowserMock).toHaveBeenCalled();
  });

  it('should return baseUrl and fullUrl from getUrlFromString', () => {
    const mockUrlString = fullUrlMock;
    const mockUrl = new URL(mockUrlString);
    getUrlFromStringMock.mockReturnValueOnce(mockUrl);

    const result = extractUrlData(mockUrlString);

    expect(result).toEqual({
      baseUrl: baseUrlMock,
      fullUrl: fullUrlMock,
    });
    expect(getUrlFromStringMock).toHaveBeenCalledWith(mockUrlString);
  });

  it('should return empty baseUrl and fullUrl if urlInstance is null', () => {
    getUrlFromBrowserMock.mockReturnValueOnce(null);

    const result = extractUrlData();

    expect(result).toEqual({
      baseUrl: '',
      fullUrl: '',
    });
    expect(getUrlFromBrowserMock).toHaveBeenCalled();
  });

  it('should return empty baseUrl and fullUrl if href is empty', () => {
    const emptyMockUrl = {
      origin: '',
      href: '',
      searchParams: new URLSearchParams(),
    } as unknown as URL;
    getUrlFromBrowserMock.mockReturnValueOnce(emptyMockUrl);

    const result = extractUrlData();

    expect(result).toEqual({
      baseUrl: '',
      fullUrl: '',
    });
    expect(getUrlFromBrowserMock).toHaveBeenCalled();
  });
});
