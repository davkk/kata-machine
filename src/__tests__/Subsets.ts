import subsets_fn from "@code/Subsets";

test("subsets", function () {
    const result = subsets_fn([1, 2, 3]);
    expect(result.length).toEqual(8);
    expect(result).toContainEqual([]);
    expect(result).toContainEqual([1]);
    expect(result).toContainEqual([2]);
    expect(result).toContainEqual([3]);
    expect(result).toContainEqual([1, 2]);
    expect(result).toContainEqual([1, 3]);
    expect(result).toContainEqual([2, 3]);
    expect(result).toContainEqual([1, 2, 3]);

    expect(subsets_fn([])).toEqual([[]]);
    expect(subsets_fn([1]).length).toEqual(2);
});
