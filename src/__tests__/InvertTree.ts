import invert_tree from "@code/InvertTree";

test("invert tree", function () {
    const tree: BinaryNode<number> = {
        value: 4,
        left: { value: 2, left: { value: 1, left: null, right: null }, right: { value: 3, left: null, right: null } },
        right: { value: 7, left: { value: 6, left: null, right: null }, right: { value: 9, left: null, right: null } },
    };

    const inverted = invert_tree(tree);

    expect(inverted!.value).toEqual(4);
    expect(inverted!.left!.value).toEqual(7);
    expect(inverted!.right!.value).toEqual(2);
    expect(inverted!.left!.left!.value).toEqual(9);
    expect(inverted!.left!.right!.value).toEqual(6);
    expect(inverted!.right!.left!.value).toEqual(3);
    expect(inverted!.right!.right!.value).toEqual(1);

    expect(invert_tree(null)).toBeNull();
});
