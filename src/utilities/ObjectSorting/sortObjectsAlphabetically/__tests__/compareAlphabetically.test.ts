import { describe, expect, it } from "vitest";
import { compareAlphabetically } from "../compareAlphabetically";

type Person = {
  name: string;
  age: number;
  city: string;
};

describe("compareAlphabetically", () => {
  const personA: Person = { name: "Alice", age: 30, city: "New York" };
  const personB: Person = { name: "Bob", age: 25, city: "San Francisco" };

  it("should return a negative number when firstObject comes before secondObject", () => {
    const result = compareAlphabetically({
      firstObject: personA,
      secondObject: personB,
      sortByKey: "name",
    });

    expect(result).toBeLessThan(0);
  });

  it("should return a positive number when secondObject comes before firstObject", () => {
    const result = compareAlphabetically({
      firstObject: personB,
      secondObject: personA,
      sortByKey: "name",
    });

    expect(result).toBeGreaterThan(0);
  });

  it("should return 0 when both objects have the same value for the key", () => {
    const personC: Person = { name: "Charlie", age: 40, city: "New York" };
    const result = compareAlphabetically({
      firstObject: personC,
      secondObject: personC,
      sortByKey: "city",
    });

    expect(result).toBe(0);
  });

  it("should handle edge cases like empty strings", () => {
    const personD: Person = { name: "", age: 30, city: "Los Angeles" };
    const personE: Person = { name: "Eve", age: 35, city: "" };

    const result1 = compareAlphabetically({
      firstObject: personD,
      secondObject: personE,
      sortByKey: "name",
    });
    expect(result1).toBeLessThan(0);

    const result2 = compareAlphabetically({
      firstObject: personD,
      secondObject: personE,
      sortByKey: "city",
    });
    expect(result2).toBeGreaterThan(0);
  });
});
