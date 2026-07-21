import merge_ranges from "@code/MergeRanges";

test("merge ranges", function () {
    expect(merge_ranges([[1, 3], [2, 6], [8, 10], [15, 18]])).toEqual([[1, 6], [8, 10], [15, 18]]);
    expect(merge_ranges([[1, 4], [4, 5]])).toEqual([[1, 5]]);
    expect(merge_ranges([[1, 2], [3, 4]])).toEqual([[1, 2], [3, 4]]);
    expect(merge_ranges([])).toEqual([]);
    expect(merge_ranges([[1, 10], [2, 3], [4, 5]])).toEqual([[1, 10]]);
});
