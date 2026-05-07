import { describe, expect, it } from 'vitest';
import { compareNumerically } from '../compareNumerically';

type TestObject = {
  id: number;
  name: string;
  value: number;
};

const baseObject1 = { id: 1, name: 'A' };
const baseObject2 = { id: 2, name: 'B' };

describe('compareNumerically', () => {
  it('should return a negative number when the first object value is smaller', () => {
    const object1: TestObject = { ...baseObject1, value: 10 };
    const object2: TestObject = { ...baseObject2, value: 20 };
    const result = compareNumerically({ firstObject: object1, secondObject: object2, sortByKey: 'value' });

    expect(result).toBeLessThan(0);
  });

  it('should return zero when the values are equal', () => {
    const object1: TestObject = { ...baseObject1, value: 10 };
    const object2: TestObject = { ...baseObject2, value: 10 };
    const result = compareNumerically({ firstObject: object1, secondObject: object2, sortByKey: 'value' });

    expect(result).toBe(0);
  });

  it('should return a positive number when the first object value is larger', () => {
    const object1: TestObject = { ...baseObject1, value: 30 };
    const object2: TestObject = { ...baseObject2, value: 20 };
    const result = compareNumerically({ firstObject: object1, secondObject: object2, sortByKey: 'value' });

    expect(result).toBeGreaterThan(0);
  });
});
