import kth_largest from "@code/KthLargest";

test("kth largest", function () {
    expect(kth_largest([3, 2, 1, 5, 6, 4], 2)).toEqual(5);
    expect(kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toEqual(4);
    expect(kth_largest([1], 1)).toEqual(1);
    expect(kth_largest([2, 1], 1)).toEqual(2);
});
