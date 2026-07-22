// === Prim's Algorithm (Minimum Spanning Tree) ===
//
// Finds a minimum spanning tree for a weighted undirected graph.
// A MST connects all vertices with minimal total edge weight and no cycles.
// Uses a "closest" array approach: at each step, pick the cheapest edge
// from the visited set to an unvisited node.
//
// Steps:
// 1. Start at node 0, mark it visited, initialize seen array with Infinity
// 2. For each unvisited neighbor of the current node, track the cheapest edge
// 3. Scan all unvisited nodes to find the one with the cheapest connection
// 4. Add that edge to the MST, mark the node visited
// 5. Update seen edges from the newly visited node
// 6. Repeat until all nodes visited or no reachable nodes remain
//
// Example:
// Designing electrical grids, building road networks connecting cities

export default function prims(list: WeightedAdjacencyList): WeightedAdjacencyList | null {
    const visited: boolean[] = new Array(list.length).fill(false);
    const mst: WeightedAdjacencyList = new Array(list.length)
        .fill(null)
        .map(() => []);
    const closest: { to: number; weight: number }[] = new Array(list.length);
    let visitedCount = 0;

    visited[0] = true;
    visitedCount++;

    for (let i = 0; i < list.length; i++) {
        closest[i] = { to: -1, weight: Infinity };
    }

    for (const edge of list[0]) {
        if (edge.weight < closest[edge.to].weight) {
            closest[edge.to] = { to: 0, weight: edge.weight };
        }
    }

    while (visitedCount < list.length) {
        let minWeight = Infinity;
        let nextNode = -1;
        let fromNode = -1;

        for (let i = 0; i < list.length; i++) {
            if (!visited[i] && closest[i].weight < minWeight) {
                minWeight = closest[i].weight;
                nextNode = i;
                fromNode = closest[i].to;
            }
        }

        if (nextNode === -1) break;

        mst[fromNode].push({ to: nextNode, weight: minWeight });
        mst[nextNode].push({ to: fromNode, weight: minWeight });
        visited[nextNode] = true;
        visitedCount++;

        for (const edge of list[nextNode]) {
            if (!visited[edge.to] && edge.weight < closest[edge.to].weight) {
                closest[edge.to] = { to: nextNode, weight: edge.weight };
            }
        }
    }

    if (visitedCount < list.length) return null;
    return mst;
}
