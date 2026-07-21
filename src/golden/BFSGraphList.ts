// === BFS Graph List ===
//
// Breadth-first search on a weighted adjacency list graph.
// Uses a queue to explore nodes level by level, recording predecessors.
//
// Steps:
// 1. Initialize a queue with source node, a seen array, and a prev array.
// 2. While queue is not empty: dequeue node, mark seen.
// 3. If node is needle, break and reconstruct path from prev array.
// 4. Otherwise, enqueue all unvisited neighbors, set prev[neighbor] = node.
// 5. Walk prev from needle back to source, reverse, and return path.
// 6. Return null if needle was never found.

export default function bfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);
    const queue: number[] = [source];
    seen[source] = true;

    while (queue.length) {
        const curr = queue.shift()!;
        if (curr === needle) break;
        for (const edge of graph[curr]) {
            if (seen[edge.to]) continue;
            seen[edge.to] = true;
            prev[edge.to] = curr;
            queue.push(edge.to);
        }
    }

    if (prev[needle] === -1 && source !== needle) return null;

    const path: number[] = [];
    let curr = needle;
    while (curr !== -1) {
        path.push(curr);
        curr = prev[curr];
    }
    return path.reverse();
}
