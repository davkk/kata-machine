// === Binary Tree In-Order Traversal ===
//
// In-order traversal visits nodes in the order: left subtree, root, right subtree.
// For a BST, this produces values in ascending sorted order.
//
// Steps:
// 1. Recursively traverse the left subtree
// 2. Visit the current node (add its value to the result)
// 3. Recursively traverse the right subtree
// 4. Return the accumulated result array
//
// Example:
// Retrieving sorted values from a BST (e.g., in-memory database index)

function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) return path;
    walk(curr.left, path);
    path.push(curr.value);
    walk(curr.right, path);
    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
