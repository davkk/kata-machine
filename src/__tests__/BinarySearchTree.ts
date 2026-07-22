import BinarySearchTree from "@code/BinarySearchTree";

function inOrderValues(tree: BinarySearchTree): number[] {
    const out: number[] = [];
    function walk(node: BinaryNode<number> | null) {
        if (!node) return;
        walk(node.left);
        out.push(node.value);
        walk(node.right);
    }
    const root = (tree as any).root as BinaryNode<number> | null;
    walk(root);
    return out;
}

test("BinarySearchTree", function () {
    const tree = new BinarySearchTree();

    expect(tree.length).toEqual(0);
    expect(tree.find(5)).toEqual(null);

    tree.insert(5);
    expect(tree.length).toEqual(1);
    expect(tree.find(5)?.value).toEqual(5);

    tree.insert(3);
    tree.insert(7);
    tree.insert(2);
    tree.insert(4);
    tree.insert(6);
    tree.insert(8);
    expect(tree.length).toEqual(7);

    expect(inOrderValues(tree)).toEqual([2, 3, 4, 5, 6, 7, 8]);

    expect(tree.find(2)?.value).toEqual(2);
    expect(tree.find(8)?.value).toEqual(8);
    expect(tree.find(9)).toEqual(null);

    tree.delete(2);
    expect(tree.length).toEqual(6);
    expect(tree.find(2)).toEqual(null);
    expect(inOrderValues(tree)).toEqual([3, 4, 5, 6, 7, 8]);

    tree.delete(8);
    expect(tree.length).toEqual(5);
    expect(tree.find(8)).toEqual(null);
    expect(inOrderValues(tree)).toEqual([3, 4, 5, 6, 7]);

    tree.delete(5);
    expect(tree.length).toEqual(4);
    expect(tree.find(5)).toEqual(null);
    expect(inOrderValues(tree)).toEqual([3, 4, 6, 7]);

    tree.delete(3);
    tree.delete(7);
    expect(tree.length).toEqual(2);
    expect(inOrderValues(tree)).toEqual([4, 6]);
});
