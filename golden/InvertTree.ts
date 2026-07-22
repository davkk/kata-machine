// === Invert Binary Tree ===
//
// Given the root of a binary tree, swap every left and right child.
// This mirrors the tree horizontally.
//
// Steps:
// 1. If root is null, return null
// 2. Swap root.left and root.right
// 3. Recursively invert left subtree
// 4. Recursively invert right subtree
// 5. Return the original root
//
// Example:
// Flipping images or UI components mirrored horizontally
//
export default function invert_tree(root: BinaryNode<number> | null): BinaryNode<number> | null {
    if (!root) return null;
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    invert_tree(root.left);
    invert_tree(root.right);
    return root;
}
