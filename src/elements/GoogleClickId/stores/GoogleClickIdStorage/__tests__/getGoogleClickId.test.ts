import { isObject, isString } from 'src/utilities';
import { type Mock, vi } from 'vitest';
import { getGoogleClickId } from '../getGoogleClickId';

vi.mock('src/utilities', () => ({
  isObject: vi.fn(),
  isString: vi.fn(),
}));

const isStringMock = isString as unknown as Mock;
const isObjectMock = isObject as unknown as Mock;

describe('getGoogleClickId', () => {
  const mockStorageKey = 'mockStorageKey';
  const mockGoogleClickId = 'mockGoogleClickId';
  const validGoogleClickIdRecord = {
    googleClickId: mockGoogleClickId,
    expiryDate: new Date().getTime() + 10000,
  };
  const expiredGoogleClickIdRecord = {
    googleClickId: mockGoogleClickId,
    expiryDate: new Date().getTime() - 10000,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return null if localStorage does not have the key', () => {
    const result = getGoogleClickId(mockStorageKey);
    expect(result).toBeNull();
  });

  it('should return null if the stored value is not a string', () => {
    localStorage.setItem(mockStorageKey, JSON.stringify(validGoogleClickIdRecord));
    isStringMock.mockReturnValueOnce(false); // Simulate that the value is not a string

    const result = getGoogleClickId(mockStorageKey);
    expect(result).toBeNull();
  });

  it('should return null if the parsed value is not an object', () => {
    localStorage.setItem(mockStorageKey, JSON.stringify(validGoogleClickIdRecord));
    isStringMock.mockReturnValueOnce(true); // Simulate valid string
    isObjectMock.mockReturnValueOnce(false); // Simulate invalid object

    const result = getGoogleClickId(mockStorageKey);
    expect(result).toBeNull();
  });

  it('should return null if the googleClickId is not a string', () => {
    const invalidGoogleClickIdRecord = { ...validGoogleClickIdRecord, googleClickId: 123 };
    localStorage.setItem(mockStorageKey, JSON.stringify(invalidGoogleClickIdRecord));
    isStringMock.mockReturnValueOnce(true); // Simulate valid string
    isObjectMock.mockReturnValueOnce(true); // Simulate valid object
    isStringMock.mockReturnValueOnce(false); // Simulate invalid googleClickId

    const result = getGoogleClickId(mockStorageKey);
    expect(result).toBeNull();
  });

  it('should return null if expiryDate is not a number', () => {
    const invalidGoogleClickIdRecord = { ...validGoogleClickIdRecord, expiryDate: 'invalid' };
    localStorage.setItem(mockStorageKey, JSON.stringify(invalidGoogleClickIdRecord));
    isStringMock.mockReturnValueOnce(true);
    isObjectMock.mockReturnValueOnce(true);
    isStringMock.mockReturnValueOnce(true); // Valid googleClickId

    const result = getGoogleClickId(mockStorageKey);
    expect(result).toBeNull();
  });

  it('should return null if googleClickId is expired', () => {
    localStorage.setItem(mockStorageKey, JSON.stringify(expiredGoogleClickIdRecord));
    isStringMock.mockReturnValueOnce(true);
    isObjectMock.mockReturnValueOnce(true);
    isStringMock.mockReturnValueOnce(true); // Valid googleClickId

    const result = getGoogleClickId(mockStorageKey);
    expect(result).toBeNull();
  });

  it('should return the googleClickId if valid', () => {
    localStorage.setItem(mockStorageKey, JSON.stringify(validGoogleClickIdRecord));
    isStringMock.mockReturnValueOnce(true);
    isObjectMock.mockReturnValueOnce(true);
    isStringMock.mockReturnValueOnce(true); // Valid googleClickId

    const result = getGoogleClickId(mockStorageKey);
    expect(result).toBe(mockGoogleClickId);
  });
});
