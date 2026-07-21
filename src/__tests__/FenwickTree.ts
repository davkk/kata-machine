import FenwickTree from "@code/FenwickTree";

test("fenwick tree", function () {
    const ft = new FenwickTree(5);
    expect(ft.length).toEqual(5);

    ft.add(1, 1);
    ft.add(2, 2);
    ft.add(3, 3);
    expect(ft.sum(1)).toEqual(1);
    expect(ft.sum(2)).toEqual(3);
    expect(ft.sum(3)).toEqual(6);
    expect(ft.sum(5)).toEqual(6);

    ft.add(3, -1);
    expect(ft.sum(5)).toEqual(5);
    expect(ft.sum(2)).toEqual(3);
});
