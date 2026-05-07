import { extractErrorMessage } from 'src/utilities';
import { type Mock, vi } from 'vitest';
import { type FormatFormDataParams, formatFormData } from '../formatFormData';

vi.mock('src/utilities', () => ({
  extractErrorMessage: vi.fn(),
}));

const extractErrorMessageMock = extractErrorMessage as Mock;

describe('formatFormData', () => {
  const mockClientIp = '127.0.0.1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should append clientIp to formData and return formatted formData', async () => {
    const mockFormData = new FormData();
    const params: FormatFormDataParams = { formData: mockFormData, clientIp: mockClientIp };

    const result = await formatFormData(params);

    expect(result.errorMessage).toBe('');
    expect(result.formattedFormData).toBe(mockFormData);
    expect(result.formattedFormData?.get('client_ip')).toBe(mockClientIp);
  });

  it('should return an error message if an exception occurs', async () => {
    const mockFormData = new FormData();
    const mockError = new Error('Test error');
    extractErrorMessageMock.mockReturnValue('Error occurred');

    mockFormData.append = vi.fn(() => {
      throw mockError;
    });

    const params: FormatFormDataParams = { formData: mockFormData, clientIp: mockClientIp };

    const result = await formatFormData(params);

    expect(result.formattedFormData).toBeUndefined();
    expect(result.errorMessage).toBe('Error occurred');
    expect(extractErrorMessageMock).toHaveBeenCalledWith(mockError);
  });
});
