import { type Mock, afterEach, describe, expect, it, vi } from 'vitest';
import { compareAlphabetically } from '../compareAlphabetically';
import { sortObjectsAlphabetically } from '../sortObjectsAlphabetically';

vi.mock('../compareAlphabetically', () => ({
  compareAlphabetically: vi.fn(),
}));

const compareAlphabeticallyMock = compareAlphabetically as unknown as Mock;

type Person = {
  name: string;
  age: number;
  city: string;
};

describe('sortObjectsAlphabetically', () => {
  const people: Person[] = [
    { name: 'Alice', age: 30, city: 'New York' },
    { name: 'Bob', age: 25, city: 'San Francisco' },
    { name: 'Charlie', age: 35, city: 'Los Angeles' },
  ];

  afterEach(() => {
    compareAlphabeticallyMock.mockReset();
  });

  it('should sort by name in alphabetical order', () => {
    compareAlphabeticallyMock.mockImplementation(({ firstObject, secondObject }) =>
      firstObject.name.localeCompare(secondObject.name),
    );

    const result = sortObjectsAlphabetically({ list: people, sortByKey: 'name' });
    expect(result).toEqual([
      { name: 'Alice', age: 30, city: 'New York' },
      { name: 'Bob', age: 25, city: 'San Francisco' },
      { name: 'Charlie', age: 35, city: 'Los Angeles' },
    ]);
    expect(compareAlphabeticallyMock).toHaveBeenCalled();
  });

  it('should sort by city in alphabetical order', () => {
    compareAlphabeticallyMock.mockImplementation(({ firstObject, secondObject }) =>
      firstObject.city.localeCompare(secondObject.city),
    );

    const result = sortObjectsAlphabetically({ list: people, sortByKey: 'city' });
    expect(result).toEqual([
      { name: 'Charlie', age: 35, city: 'Los Angeles' },
      { name: 'Alice', age: 30, city: 'New York' },
      { name: 'Bob', age: 25, city: 'San Francisco' },
    ]);
    expect(compareAlphabeticallyMock).toHaveBeenCalled();
  });

  it('should return an empty array when given an empty list', () => {
    const list: Person[] = [];
    const result = sortObjectsAlphabetically({ list, sortByKey: 'name' });
    expect(result).toEqual([]);
    expect(compareAlphabeticallyMock).not.toHaveBeenCalled();
  });

  it('should handle objects with empty string values for the sort key', () => {
    const peopleWithEmptyName: Person[] = [
      { name: '', age: 30, city: 'New York' },
      { name: 'Bob', age: 25, city: 'San Francisco' },
      { name: '', age: 35, city: 'Los Angeles' },
    ];

    compareAlphabeticallyMock.mockImplementation(({ firstObject, secondObject }) =>
      firstObject.name.localeCompare(secondObject.name),
    );

    const result = sortObjectsAlphabetically({ list: peopleWithEmptyName, sortByKey: 'name' });
    expect(result).toEqual([
      { name: '', age: 30, city: 'New York' },
      { name: '', age: 35, city: 'Los Angeles' },
      { name: 'Bob', age: 25, city: 'San Francisco' },
    ]);
    expect(compareAlphabeticallyMock).toHaveBeenCalled();
  });
});
