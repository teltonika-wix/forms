import { isSuccessfulStatusCode } from 'src/utilities';
import { type Mock, vi } from 'vitest';
import type { FormSecrets } from '../../../types';
import { generateFormUrl } from '../generateFormUrl';
import { getIpLocationInfo } from '../getIpLocationInfo';

vi.mock('src/utilities', () => ({
  isSuccessfulStatusCode: vi.fn(),
}));

vi.mock('../generateFormUrl', () => ({
  generateFormUrl: vi.fn(),
}));

const isSuccessfulStatusCodeMock = isSuccessfulStatusCode as unknown as Mock;
const generateFormUrlMock = generateFormUrl as unknown as Mock;

describe('getIpLocationInfo', () => {
  const mockFormMicroserviceUrl = 'https://form-service.com';
  const mockFormMicroserviceToken = 'secret-token';
  const mockFormSecrets: FormSecrets = {
    formMicroserviceUrl: mockFormMicroserviceUrl,
    formMicroserviceToken: mockFormMicroserviceToken,
  };
  const mockUserIp = '127.0.0.1';
  const mockEndpoint = `/location/${mockUserIp}`;
  const mockFormUrl = `${mockFormMicroserviceUrl}${mockEndpoint}`;

  globalThis.fetch = vi.fn();
  const fetchMock = globalThis.fetch as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch IP location info successfully', async () => {
    generateFormUrlMock.mockResolvedValue(mockFormUrl);
    isSuccessfulStatusCodeMock.mockReturnValue(true);
    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    const result = await getIpLocationInfo({
      userIp: mockUserIp,
      formSecrets: mockFormSecrets,
    });

    expect(generateFormUrlMock).toHaveBeenCalledWith({
      endpoint: mockEndpoint,
      formSecrets: mockFormSecrets,
    });
    expect(fetchMock).toHaveBeenCalledWith(mockFormUrl);
    expect(result).toEqual({
      status: 200,
      json: expect.any(Function),
    });
  });

  it('should throw an error if the response status is not successful', async () => {
    generateFormUrlMock.mockResolvedValue(mockFormUrl);
    isSuccessfulStatusCodeMock.mockReturnValue(false);
    fetchMock.mockResolvedValue({
      status: 500,
      json: vi.fn(),
    });

    await expect(
      getIpLocationInfo({
        userIp: mockUserIp,
        formSecrets: mockFormSecrets,
      }),
    ).rejects.toThrow('Failed to fetch form structure');

    expect(fetchMock).toHaveBeenCalledWith(mockFormUrl);
  });
});
