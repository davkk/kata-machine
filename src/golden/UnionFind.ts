// === Union-Find (Disjoint Set Union) ===
//
// A data structure for tracking elements partitioned into disjoint subsets.
// Supports union and find operations in near O(1) amortized time via
// path compression and union by rank.
//
// Steps:
// 1. Initialize each element as its own parent with rank 0
// 2. find(p): follow parent pointers with path compression (halving)
// 3. union(p, q): find roots, attach smaller rank under larger rank
// 4. connected(p, q): check if find(p) == find(q)
//
export default class UnionFind {
    public length: number;
    private parent: number[];
    private rank: number[];

    constructor(n: number) {
        this.length = n;
        this.parent = new Array(n);
        this.rank = new Array(n);
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }

    find(p: number): number {
        while (p !== this.parent[p]) {
            this.parent[p] = this.parent[this.parent[p]];
            p = this.parent[p];
        }
        return p;
    }

    union(p: number, q: number): void {
        const rootP = this.find(p);
        const rootQ = this.find(q);
        if (rootP === rootQ) return;

        if (this.rank[rootP] < this.rank[rootQ]) {
            this.parent[rootP] = rootQ;
        } else if (this.rank[rootP] > this.rank[rootQ]) {
            this.parent[rootQ] = rootP;
        } else {
            this.parent[rootQ] = rootP;
            this.rank[rootP]++;
        }
    }

    connected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }
}
