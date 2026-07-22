// === BFS Graph Matrix ===
//
// Breadth-first search on a weighted adjacency matrix graph.
// Matrix[i][j] > 0 means an edge exists from i to j with that weight.
// Uses a queue and a prev array to reconstruct the shortest path (by edge count).
//
// Steps:
// 1. Initialize queue with source, seen array, and prev array.
// 2. While queue not empty: dequeue, if needle found, break.
// 3. Look at all neighbors in matrix row: if edge exists and not seen,
//    mark seen, set prev, enqueue.
// 4. Reconstruct path from prev array (needle back to source), reverse it.
// 5. Return path or null.
//
// Example:
// Shortest path in an unweighted grid-based map or game board

export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);
    const queue: number[] = [source];
    let idx = 0;
    seen[source] = true;

    while (idx < queue.length) {
        const curr = queue[idx++]!;
        if (curr === needle) break;
        for (let i = 0; i < graph[curr].length; i++) {
            if (graph[curr][i] === 0) continue;
            if (seen[i]) continue;
            seen[i] = true;
            prev[i] = curr;
            queue.push(i);
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
