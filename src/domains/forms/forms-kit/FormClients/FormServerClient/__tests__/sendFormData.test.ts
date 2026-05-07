import { type Mock, vi } from 'vitest';
import type { FormSecrets, FormUrlParameters } from '../../../types/formGeneralTypes';
import { validateFormParams } from '../../../utils/validateFormParams';
import { generateFormUrl } from '../generateFormUrl';
import { sendFormData } from '../sendFormData';

vi.mock('../../../utils/validateFormParams', () => ({
  validateFormParams: vi.fn(),
}));

vi.mock('../generateFormUrl', () => ({
  generateFormUrl: vi.fn(),
}));

const validateFormParamsMock = validateFormParams as unknown as Mock;
const generateFormUrlMock = generateFormUrl as unknown as Mock;

describe('sendFormData', () => {
  const mockEndpoint = '/form/submit';
  const mockFormMicroserviceUrl = 'https://form-service.com';
  const mockFormMicroserviceToken = 'secret-token';
  const mockFormSecrets: FormSecrets = {
    formMicroserviceUrl: mockFormMicroserviceUrl,
    formMicroserviceToken: mockFormMicroserviceToken,
  };
  const mockFormCode = 'ContactForm';
  const mockFormUrlParameters: FormUrlParameters = { language: 'en', form: mockFormCode };
  const mockFormData = new FormData();
  const mockFormUrl = `${mockFormMicroserviceUrl}${mockEndpoint}?language=en&form=${mockFormCode}&token=${mockFormSecrets.formMicroserviceToken}`;

  globalThis.fetch = vi.fn();
  const fetchMock = globalThis.fetch as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send form data successfully', async () => {
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    generateFormUrlMock.mockResolvedValue(mockFormUrl);

    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    const result = await sendFormData({
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formSecrets: mockFormSecrets,
    });

    expect(validateFormParamsMock).toHaveBeenCalledWith(mockFormUrlParameters);
    expect(generateFormUrlMock).toHaveBeenCalledWith({
      formUrlParameters: mockFormUrlParameters,
      endpoint: mockEndpoint,
      formSecrets: mockFormSecrets,
    });
    expect(fetchMock).toHaveBeenCalledWith(mockFormUrl, {
      method: 'POST',
      body: mockFormData,
    });
    expect(result).toEqual({
      status: 200,
      json: expect.any(Function),
    });
  });

  it('should throw an error if form validation fails', async () => {
    const mockErrorMessage = 'Form parameters validation error';
    validateFormParamsMock.mockImplementation(() => {
      throw new Error(mockErrorMessage);
    });

    await expect(
      sendFormData({
        formData: mockFormData,
        formUrlParameters: mockFormUrlParameters,
        formSecrets: mockFormSecrets,
      }),
    ).rejects.toThrow(mockErrorMessage);
  });

  it('should throw an error if the fetch fails', async () => {
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    generateFormUrlMock.mockResolvedValue(mockFormUrl);
    fetchMock.mockRejectedValue(new Error('Fetch error'));

    await expect(
      sendFormData({
        formData: mockFormData,
        formUrlParameters: mockFormUrlParameters,
        formSecrets: mockFormSecrets,
      }),
    ).rejects.toThrow('Fetch error');
  });
});
