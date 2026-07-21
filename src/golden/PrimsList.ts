// === Prim's Algorithm (Minimum Spanning Tree) ===
//
// Finds a minimum spanning tree for a weighted undirected graph.
// A MST connects all vertices with minimal total edge weight and no cycles.
//
// Steps:
// 1. Start at node 0, mark it visited
// 2. Add all edges from current node to a list
// 3. Pick the lowest-weight edge to an unvisited node
// 4. Add that edge to the MST, mark the node visited
// 5. Remove the used edge from the list
// 6. Set the new node as current, repeat until all nodes visited or unreachable
//
export default function prims(list: WeightedAdjacencyList): WeightedAdjacencyList | null {

    const visited: boolean[] = new Array(list.length).fill(false);
    const mst: GraphEdge[][] = new Array(list.length).fill(null).map(() => []);

    visited[0] = true;
    let current = 0;

    const edges: [number, GraphEdge][] = [];

    do {
        for (const edgemeDaddy of list[current]) {
            edges.push([current, edgemeDaddy]);
        }

        let lowest = Infinity;
        let lowestEdge: [number, GraphEdge | null] = [-1, null];
        for (const edge of edges) {
            if (visited[edge[1].to] === false && edge[1].weight < lowest) {
                lowest = edge[1].weight;
                lowestEdge = edge;
            }
        }

        if (lowestEdge[1] !== null) {
            mst[lowestEdge[0]].push(lowestEdge[1]);
            mst[lowestEdge[1].to].push({to: lowestEdge[0], weight: lowestEdge[1].weight});
            visited[lowestEdge[1].to] = true;
            edges.splice(edges.indexOf(lowestEdge as [number, GraphEdge]), 1);
        }

        current = lowestEdge[1]?.to || -1;

    } while (visited.includes(false) && current >= 0);

    return mst;
}

