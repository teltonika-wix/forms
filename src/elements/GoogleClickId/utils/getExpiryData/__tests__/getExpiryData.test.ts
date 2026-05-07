import { EXPIRY_PERIOD_IN_MS, getExpiryData } from '../getExpiryData';

describe('getExpiryData', () => {
  it('should return a correct expiry date 90 days from now', () => {
    const currentTime = Date.now();
    const expectedExpiryDate = currentTime + EXPIRY_PERIOD_IN_MS;

    // Mock Date.now to return the current time
    vi.spyOn(Date, 'now').mockReturnValue(currentTime);

    const result = getExpiryData();

    // Compare in seconds by dividing both values by 1000
    expect(Math.floor(result / 1000)).toBeCloseTo(Math.floor(expectedExpiryDate / 1000), 0);

    // Restore the original Date.now implementation
    vi.restoreAllMocks();
  });
});
