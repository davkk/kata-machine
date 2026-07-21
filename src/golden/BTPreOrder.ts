// === Binary Tree Pre-Order Traversal ===
//
// Pre-order traversal visits nodes in the order: root, left subtree, right subtree.
// This is a depth-first traversal that processes the current node before its children.
//
// Steps:
// 1. Visit the current node (add its value to the result)
// 2. Recursively traverse the left subtree
// 3. Recursively traverse the right subtree
// 4. Return the accumulated result array

function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) return path;
    path.push(curr.value);
    walk(curr.left, path);
    walk(curr.right, path);
    return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
