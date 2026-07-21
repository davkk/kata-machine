import topological_sort from "@code/TopologicalSort";

test("topological sort", function () {
    const result = topological_sort(4, [[0, 1], [1, 2], [3, 0]]);
    expect(result.indexOf(3)).toBeLessThan(result.indexOf(0));
    expect(result.indexOf(0)).toBeLessThan(result.indexOf(1));
    expect(result.indexOf(1)).toBeLessThan(result.indexOf(2));

    expect(topological_sort(2, [[0, 1], [1, 0]])).toEqual([]);

    expect(topological_sort(1, [])).toEqual([0]);
});
