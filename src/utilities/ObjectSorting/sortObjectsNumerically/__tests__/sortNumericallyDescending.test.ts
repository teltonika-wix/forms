import { type Mock, describe, expect, it, vi } from 'vitest';
import { type CompareNumericallyParams, compareNumerically } from '../compareNumerically';
import { sortNumericallyDescending } from '../sortNumericallyDescending';

vi.mock('../compareNumerically', () => ({
  compareNumerically: vi.fn(),
}));

const compareNumericallyMock = compareNumerically as Mock;

type MockListItem = { value: number };

describe('sortNumericallyDescending', () => {
  const mockList: MockListItem[] = [{ value: 1 }, { value: 3 }, { value: 2 }];

  it('sorts the list in descending order using compareNumerically', () => {
    const mockSortByKey = 'value';

    // Mock the behavior of compareNumerically
    compareNumericallyMock.mockImplementation(
      ({ firstObject, secondObject, sortByKey }: CompareNumericallyParams<MockListItem>) =>
        firstObject[sortByKey] - secondObject[sortByKey],
    );

    const result = sortNumericallyDescending({
      list: mockList,
      sortByKey: mockSortByKey,
    });

    // Ensure compareNumerically was called the correct number of times
    expect(compareNumericallyMock).toHaveBeenCalledTimes(4);

    // Check if the result is sorted correctly
    expect(result).toEqual([{ value: 3 }, { value: 2 }, { value: 1 }]);
  });

  it('does not mutate the original list', () => {
    const mockSortByKey = 'value';
    const originalList = [...mockList];

    sortNumericallyDescending({
      list: mockList,
      sortByKey: mockSortByKey,
    });

    expect(mockList).toEqual(originalList);
  });
});
