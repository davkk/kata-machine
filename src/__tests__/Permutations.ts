import permutations_fn from "@code/Permutations";

test("permutations", function () {
    const result = permutations_fn([1, 2, 3]);
    expect(result.length).toEqual(6);
    expect(result).toContainEqual([1, 2, 3]);
    expect(result).toContainEqual([1, 3, 2]);
    expect(result).toContainEqual([2, 1, 3]);
    expect(result).toContainEqual([2, 3, 1]);
    expect(result).toContainEqual([3, 1, 2]);
    expect(result).toContainEqual([3, 2, 1]);

    expect(permutations_fn([])).toEqual([[]]);
    expect(permutations_fn([1]).length).toEqual(1);
});
