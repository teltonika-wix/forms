import { createUrlWithParams } from 'src/utilities';
import { type Mock, vi } from 'vitest';
import type { ExactFormUrlParameters } from '../../../types/formGeneralTypes';
import { createFullFormUrl } from '../createFullFormUrl';

vi.mock('src/utilities', () => ({
  createUrlWithParams: vi.fn(),
}));

const createUrlWithParamsMock = createUrlWithParams as unknown as Mock;

describe('createFullFormUrl', () => {
  const mockFormCode = 'ContactForm';
  const mockSearchParams = { language: 'en', form: mockFormCode } as ExactFormUrlParameters;
  const mockFormWebClientEndpoint = '/form-endpoint';
  const mockOrigin = 'https://example.com';
  const mockFullUrl = `${mockOrigin}${mockFormWebClientEndpoint}?language=en&form=${mockFormCode}`;

  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.window = {
      location: {
        origin: mockOrigin,
      },
    } as unknown as Window & typeof globalThis;
  });

  it('should create a full form URL with the provided parameters', () => {
    createUrlWithParamsMock.mockReturnValue(mockFullUrl);

    const result = createFullFormUrl({
      formWebClientEndpoint: mockFormWebClientEndpoint,
      searchParams: mockSearchParams,
    });

    expect(createUrlWithParamsMock).toHaveBeenCalledWith({
      baseUrl: mockOrigin,
      endpoint: mockFormWebClientEndpoint,
      searchParams: mockSearchParams,
    });
    expect(result).toBe(mockFullUrl);
  });
});
