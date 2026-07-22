// === Compare Binary Trees ===
//
// Recursively compares two binary trees to determine structural and value equality.
// Two trees are equal if they have the same structure and same values at each node.
//
// Steps:
// 1. If both nodes are null, they are equal — return true
// 2. If one is null and the other isn't, they differ — return false
// 3. If the values differ, they are not equal — return false
// 4. Recursively compare the left subtrees
// 5. Recursively compare the right subtrees
// 6. Return true only if both subtrees are equal
//
// Example:
// Testing structural equality of DOM trees or JSON objects

export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    if (a.value !== b.value) return false;
    return compare(a.left, b.left) && compare(a.right, b.right);
}
