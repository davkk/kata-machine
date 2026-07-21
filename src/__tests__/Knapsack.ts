import knapsack from "@code/Knapsack";

test("knapsack", function () {
    expect(knapsack(10, [5, 4, 6, 3], [10, 40, 30, 50])).toEqual(90);
    expect(knapsack(5, [2, 3, 4], [3, 4, 5])).toEqual(7);
    expect(knapsack(0, [1, 2], [5, 6])).toEqual(0);
    expect(knapsack(50, [10, 20, 30], [60, 100, 120])).toEqual(220);
});
