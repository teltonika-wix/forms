import { type Mock, describe, expect, it, vi } from "vitest";
import { sortNumericallyAscending } from "../sortNumericallyAscending";
import { sortNumericallyDescending } from "../sortNumericallyDescending";
import { sortObjectsNumerically } from "../sortObjectsNumerically";

vi.mock("../sortNumericallyAscending", () => ({
  sortNumericallyAscending: vi.fn(),
}));

vi.mock("../sortNumericallyDescending", () => ({
  sortNumericallyDescending: vi.fn(),
}));

const sortNumericallyAscendingMock = sortNumericallyAscending as Mock;
const sortNumericallyDescendingMock = sortNumericallyDescending as Mock;

describe("sortObjectsNumerically", () => {
  const mockList = [{ value: 3 }, { value: 1 }, { value: 2 }];

  it('calls sortNumericallyAscending when direction is "ascending"', () => {
    const mockSortByKey = "value";
    sortNumericallyAscendingMock.mockReturnValue([{ value: 1 }, { value: 2 }, { value: 3 }]);

    const result = sortObjectsNumerically({
      list: mockList,
      sortByKey: mockSortByKey,
      direction: "ascending",
    });

    expect(sortNumericallyAscending).toHaveBeenCalledWith({
      list: mockList,
      sortByKey: mockSortByKey,
    });

    expect(result).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
  });

  it('calls sortNumericallyDescending when direction is "descending"', () => {
    const mockSortByKey = "value";
    sortNumericallyDescendingMock.mockReturnValue([{ value: 3 }, { value: 2 }, { value: 1 }]);

    const result = sortObjectsNumerically({
      list: mockList,
      sortByKey: mockSortByKey,
      direction: "descending",
    });

    expect(sortNumericallyDescending).toHaveBeenCalledWith({
      list: mockList,
      sortByKey: mockSortByKey,
    });

    expect(result).toEqual([{ value: 3 }, { value: 2 }, { value: 1 }]);
  });
});
