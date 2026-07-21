// === Fenwick Tree (Binary Indexed Tree) ===
//
// A data structure for efficient prefix sum queries and point updates.
// Both operations run in O(log n) time.
//
// Steps:
// 1. Maintain internal tree array of size n+1 (1-indexed)
// 2. add(idx, delta): traverse idx += idx & -idx, adding delta to each node
// 3. sum(idx): traverse idx -= idx & -idx, accumulating values
//
export default class FenwickTree {
    public length: number;
    private tree: number[];

    constructor(n: number) {
        this.length = n;
        this.tree = new Array(n + 1).fill(0);
    }

    add(idx: number, delta: number): void {
        while (idx <= this.length) {
            this.tree[idx] += delta;
            idx += idx & -idx;
        }
    }

    sum(idx: number): number {
        let result = 0;
        while (idx > 0) {
            result += this.tree[idx];
            idx -= idx & -idx;
        }
        return result;
    }
}
