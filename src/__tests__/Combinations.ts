import combinations_fn from "@code/Combinations";

test("combinations", function () {
    const result = combinations_fn(4, 2);
    expect(result.length).toEqual(6);
    expect(result).toContainEqual([1, 2]);
    expect(result).toContainEqual([1, 3]);
    expect(result).toContainEqual([1, 4]);
    expect(result).toContainEqual([2, 3]);
    expect(result).toContainEqual([2, 4]);
    expect(result).toContainEqual([3, 4]);

    expect(combinations_fn(4, 4)).toEqual([[1, 2, 3, 4]]);
    expect(combinations_fn(4, 0)).toEqual([[]]);
});
