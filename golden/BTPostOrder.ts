// === Binary Tree Post-Order Traversal ===
//
// Post-order traversal visits nodes in the order: left subtree, right subtree, root.
// This is commonly used for deleting trees or evaluating expression trees
// where children must be processed before the parent.
//
// Steps:
// 1. Recursively traverse the left subtree
// 2. Recursively traverse the right subtree
// 3. Visit the current node (add its value to the result)
// 4. Return the accumulated result array
//
// Example:
// Deleting a tree (process children before parent) or evaluating expression trees

function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) return path;
    walk(curr.left, path);
    walk(curr.right, path);
    path.push(curr.value);
    return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
