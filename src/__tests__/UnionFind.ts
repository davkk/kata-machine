import UnionFind from "@code/UnionFind";

test("union find", function () {
    const uf = new UnionFind(10);
    expect(uf.length).toEqual(10);

    expect(uf.connected(0, 1)).toEqual(false);
    uf.union(0, 1);
    expect(uf.connected(0, 1)).toEqual(true);

    uf.union(2, 3);
    uf.union(4, 5);
    uf.union(1, 2);
    expect(uf.connected(0, 3)).toEqual(true);
    expect(uf.connected(0, 4)).toEqual(false);

    uf.union(3, 4);
    expect(uf.connected(0, 5)).toEqual(true);
    expect(uf.connected(6, 7)).toEqual(false);

    expect(uf.find(0)).toEqual(uf.find(5));
});
