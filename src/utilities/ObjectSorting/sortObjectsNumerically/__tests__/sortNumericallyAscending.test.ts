import { type Mock, describe, expect, it, vi } from 'vitest';
import { type CompareNumericallyParams, compareNumerically } from '../compareNumerically';
import { sortNumericallyAscending } from '../sortNumericallyAscending';

vi.mock('../compareNumerically', () => ({
  compareNumerically: vi.fn(),
}));

const compareNumericallyMock = compareNumerically as Mock;

type MockListItem = { value: number };

describe('sortNumericallyAscending', () => {
  const mockList: MockListItem[] = [{ value: 3 }, { value: 1 }, { value: 2 }];

  it('sorts the list in ascending order using compareNumerically', () => {
    const mockSortByKey = 'value';

    // Mock the behavior of compareNumerically
    compareNumericallyMock.mockImplementation(
      ({ firstObject, secondObject, sortByKey }: CompareNumericallyParams<MockListItem>) =>
        (firstObject[sortByKey] as number) - (secondObject[sortByKey] as number),
    );

    const result = sortNumericallyAscending({
      list: mockList,
      sortByKey: mockSortByKey,
    });

    // Ensure compareNumerically was called the correct number of times
    expect(compareNumericallyMock).toHaveBeenCalledTimes(4);

    // Check if the result is sorted correctly
    expect(result).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
  });

  it('does not mutate the original list', () => {
    const mockSortByKey = 'value';
    const originalList = [...mockList];

    sortNumericallyAscending({
      list: mockList,
      sortByKey: mockSortByKey,
    });

    expect(mockList).toEqual(originalList);
  });
});
