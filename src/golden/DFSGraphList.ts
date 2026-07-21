// === DFS Graph List ===
//
// Depth-first search on a weighted adjacency list graph.
// Uses recursion (or explicit stack) with a visited set to traverse
// from source to needle, reconstructing the path on success.
//
// Steps:
// 1. Initialize a visited array and a prev array filled with -1/null.
// 2. Use recursion: mark current node visited, explore each neighbor.
// 3. If neighbor not visited, set prev[neighbor] = current, recurse.
// 4. If needle found, return true to unwind.
// 5. After recursion, build path from prev array: walk from needle back to source.
// 6. Return path array or null if no path exists.

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);

    function walk(curr: number): boolean {
        if (curr === needle) return true;
        seen[curr] = true;
        for (const edge of graph[curr]) {
            if (seen[edge.to]) continue;
            prev[edge.to] = curr;
            if (walk(edge.to)) return true;
        }
        return false;
    }

    if (!walk(source)) return null;

    const path: number[] = [];
    let curr = needle;
    while (curr !== -1) {
        path.push(curr);
        curr = prev[curr];
    }
    return path.reverse();
}
