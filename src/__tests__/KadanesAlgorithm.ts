import max_subarray from "@code/KadanesAlgorithm";

test("kadanes algorithm", function () {
    expect(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6);
    expect(max_subarray([1])).toEqual(1);
    expect(max_subarray([5, 4, -1, 7, 8])).toEqual(23);
    expect(max_subarray([-1])).toEqual(-1);
    expect(max_subarray([-2, -1])).toEqual(-1);
});
