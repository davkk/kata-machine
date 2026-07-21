import sliding_window_max from "@code/SlidingWindowMax";

test("sliding window max", function () {
    expect(sliding_window_max([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([3, 3, 5, 5, 6, 7]);
    expect(sliding_window_max([1], 1)).toEqual([1]);
    expect(sliding_window_max([1, -1], 1)).toEqual([1, -1]);
    expect(sliding_window_max([9, 11], 2)).toEqual([11]);
    expect(sliding_window_max([4, -2], 2)).toEqual([4]);
});
