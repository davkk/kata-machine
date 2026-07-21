import find_min_rotated from "@code/FindMinRotatedSorted";

test("find min rotated", function () {
    expect(find_min_rotated([3, 4, 5, 1, 2])).toEqual(1);
    expect(find_min_rotated([4, 5, 6, 7, 0, 1, 2])).toEqual(0);
    expect(find_min_rotated([11, 13, 15, 17])).toEqual(11);
    expect(find_min_rotated([1])).toEqual(1);
    expect(find_min_rotated([2, 1])).toEqual(1);
});
