import two_sum_sorted from "@code/TwoSumSorted";

test("two sum sorted", function () {
    expect(two_sum_sorted([2, 7, 11, 15], 9)).toEqual([1, 2]);
    expect(two_sum_sorted([2, 3, 4], 6)).toEqual([1, 3]);
    expect(two_sum_sorted([-1, 0], -1)).toEqual([1, 2]);
    expect(two_sum_sorted([1, 2, 3, 4, 5], 9)).toEqual([4, 5]);
});
