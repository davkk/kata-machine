export default function kruskals(list: WeightedAdjacencyList): WeightedAdjacencyList | null {
    const edges: [number, number, number][] = [];
    for (let u = 0; u < list.length; u++) {
        for (const edge of list[u]) {
            if (u < edge.to) {
                edges.push([u, edge.to, edge.weight]);
            }
        }
    }

    edges.sort((a, b) => a[2] - b[2]);

    const parent: number[] = new Array(list.length).fill(-1);

    function find(x: number): number {
        while (parent[x] >= 0) {
            if (parent[parent[x]] >= 0) {
                parent[x] = parent[parent[x]];
            }
            x = parent[x];
        }
        return x;
    }

    function union(x: number, y: number): boolean {
        const rx = find(x);
        const ry = find(y);
        if (rx === ry) return false;
        if (parent[rx] < parent[ry]) {
            parent[rx] += parent[ry];
            parent[ry] = rx;
        } else {
            parent[ry] += parent[rx];
            parent[rx] = ry;
        }
        return true;
    }

    const mst: WeightedAdjacencyList = new Array(list.length)
        .fill(null)
        .map(() => []);

    for (const [u, v, w] of edges) {
        if (union(u, v)) {
            mst[u].push({ to: v, weight: w });
            mst[v].push({ to: u, weight: w });
        }
    }

    const root = find(0);
    for (let i = 1; i < list.length; i++) {
        if (find(i) !== root) return null;
    }

    return mst;
}
