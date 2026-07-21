// === Depth-First Search on a Binary Search Tree ===
//
// DFS on a BST leverages the BST property (left < root < right) to guide
// the search. At each node, compare the needle to the current value and
// recurse into the appropriate subtree.
//
// Steps:
// 1. If the current node is null, the needle is not found — return false
// 2. If the current node's value equals the needle — return true
// 3. If the needle is less than the current value, search the left subtree
// 4. If the needle is greater than the current value, search the right subtree

function search(curr: BinaryNode<number> | null, needle: number): boolean {
    if (!curr) return false;
    if (curr.value === needle) return true;
    if (needle < curr.value) return search(curr.left, needle);
    return search(curr.right, needle);
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}
