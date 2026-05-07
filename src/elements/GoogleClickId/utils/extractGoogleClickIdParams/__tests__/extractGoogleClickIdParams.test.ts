import { extractSearchParams, getUrlFromBrowser } from 'src/utilities';
import { type Mock, vi } from 'vitest';
import { GOOGLE_CLICK_ID_PARAMS, extractGoogleClickIdParams } from '../extractGoogleClickIdParams';

vi.mock('src/utilities', () => ({
  extractSearchParams: vi.fn(),
  getUrlFromBrowser: vi.fn(),
}));

const extractSearchParamsMock = extractSearchParams as Mock;
const getUrlFromBrowserMock = getUrlFromBrowser as Mock;

describe('extractGoogleClickIdParams', () => {
  beforeEach(() => {
    getUrlFromBrowserMock.mockReturnValue('http://example.com');
    vi.clearAllMocks();
  });

  it('should return undefined if getUrlFromBrowser returns null', () => {
    getUrlFromBrowserMock.mockReturnValueOnce(null);

    const result = extractGoogleClickIdParams();
    expect(result).toBeUndefined();
  });

  it('should return undefined if extractSearchParams returns undefined values', () => {
    extractSearchParamsMock.mockReturnValueOnce([undefined, undefined]);

    const result = extractGoogleClickIdParams();
    expect(result).toBeUndefined();
  });

  it('should return undefined when googleClickId is missing', () => {
    // Missing googleClickId
    extractSearchParamsMock.mockReturnValueOnce([undefined, 'gclsrc']);

    const result = extractGoogleClickIdParams();
    expect(result).toBeUndefined();
  });

  it('should return params if googleClickId is present and source is missing', () => {
    extractSearchParamsMock.mockReturnValueOnce(['gclid', undefined]);

    const result = extractGoogleClickIdParams();

    expect(result).toEqual({
      googleClickId: 'gclid',
      googleClickIdSource: undefined,
    });
    expect(extractSearchParamsMock).toHaveBeenCalledWith('http://example.com', GOOGLE_CLICK_ID_PARAMS);
  });

  it('should return params when source contains "aw"', () => {
    extractSearchParamsMock.mockReturnValueOnce(['gclid', 'aw-some-source']);

    const result = extractGoogleClickIdParams();

    expect(result).toEqual({
      googleClickId: 'gclid',
      googleClickIdSource: 'aw-some-source',
    });
    expect(extractSearchParamsMock).toHaveBeenCalledWith('http://example.com', GOOGLE_CLICK_ID_PARAMS);
  });

  it('should return undefined when source is present but does not contain "aw"', () => {
    extractSearchParamsMock.mockReturnValueOnce(['gclid', 'gclsrc']);

    const result = extractGoogleClickIdParams();

    expect(result).toBeUndefined();
  });

  it('should handle errors and return undefined when an error occurs', () => {
    getUrlFromBrowserMock.mockImplementationOnce(() => {
      throw new Error('Simulated error');
    });

    expect(extractGoogleClickIdParams()).toBeUndefined();
  });
});
