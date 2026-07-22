// === Binary Tree Breadth-First Search ===
//
// BFS (level-order) traversal visits nodes level by level from left to right.
// It uses a queue to track nodes to visit and checks each node's value
// against the target needle.
//
// Steps:
// 1. Initialize a queue with the root node
// 2. While the queue is not empty, dequeue a node
// 3. If the node's value matches the needle, return true
// 4. Enqueue the left child (if it exists)
// 5. Enqueue the right child (if it exists)
// 6. If the queue empties without finding the needle, return false
//
// Example:
// Level-order traversal for serializing binary trees or finding tree height

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q: (BinaryNode<number> | null)[] = [head];
    let idx = 0;
    while (idx < q.length) {
        const curr = q[idx++]!;
        if (curr.value === needle) return true;
        if (curr.left) q.push(curr.left);
        if (curr.right) q.push(curr.right);
    }
    return false;
}
