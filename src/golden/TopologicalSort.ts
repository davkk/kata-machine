// === Topological Sort (Kahn's Algorithm) ===
//
// Given a directed acyclic graph, produce a linear ordering of nodes
// where every node appears before its successors. Uses BFS with indegree.
//
// Steps:
// 1. Build adjacency list and compute indegree for each node
// 2. Initialize queue with all nodes of indegree 0
// 3. While queue not empty, dequeue a node and add to result
// 4. Decrease indegree of its neighbors; if any reaches 0, enqueue
// 5. If all nodes processed, return result; otherwise empty (cycle detected)
//
export default function topological_sort(numNodes: number, edges: [number, number][]): number[] {
    const indegree: number[] = new Array(numNodes).fill(0);
    const adj: number[][] = Array.from({ length: numNodes }, () => []);
    for (const [from, to] of edges) {
        adj[from].push(to);
        indegree[to]++;
    }
    const q: number[] = [];
    for (let i = 0; i < numNodes; i++) {
        if (indegree[i] === 0) q.push(i);
    }
    const result: number[] = [];
    while (q.length > 0) {
        const node = q.shift()!;
        result.push(node);
        for (const next of adj[node]) {
            indegree[next]--;
            if (indegree[next] === 0) q.push(next);
        }
    }
    return result.length === numNodes ? result : [];
}
