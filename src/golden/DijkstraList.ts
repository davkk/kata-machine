// === Dijkstra's Shortest Path (Adjacency List) ===
//
// Finds the shortest weighted path from source to sink using Dijkstra's algorithm.
// Uses a "has seen" array and a "min distance" array, repeatedly selecting
// the unvisited node with the smallest known distance.
//
// Steps:
// 1. Initialize dist array with Infinity, dist[source] = 0, seen array false.
// 2. Repeat: find unvisited node with smallest distance (use linear scan).
// 3. Mark it seen, relax all its edges (update dist and prev if shorter).
// 4. Continue until sink is visited or no reachable nodes remain.
// 5. Reconstruct path from prev array (sink back to source), reverse, return.

function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowest = Infinity;
    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) continue;
        if (dists[i] < lowest) {
            lowest = dists[i];
            idx = i;
        }
    }
    return idx;
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen = new Array(arr.length).fill(false);
    const prev = new Array(arr.length).fill(-1);
    const dists = new Array(arr.length).fill(Infinity);
    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        const curr = getLowestUnvisited(seen, dists);
        seen[curr] = true;

        if (curr === sink) break;

        for (const edge of arr[curr]) {
            if (seen[edge.to]) continue;
            const newDist = dists[curr] + edge.weight;
            if (newDist < dists[edge.to]) {
                dists[edge.to] = newDist;
                prev[edge.to] = curr;
            }
        }
    }

    const path: number[] = [];
    let curr = sink;
    while (curr !== -1) {
        path.push(curr);
        curr = prev[curr];
    }
    return path.reverse();
}
