// === Segment Tree ===
//
// A tree data structure for answering range queries and performing
// point updates on an array. Both operations run in O(log n) time.
//
// Steps:
// 1. Build tree recursively: leaves hold array values, nodes hold sum of children
// 2. update(idx, value): compute diff, propagate through the tree
// 3. query(left, right): traverse tree, return sum of overlapping segments
//
export default class SegmentTree {
    public length: number;
    private tree: number[];
    private arr: number[];

    constructor(arr: number[]) {
        this.length = arr.length;
        this.arr = arr;
        this.tree = new Array(4 * arr.length).fill(0);
        this.build(0, 0, arr.length - 1);
    }

    private build(node: number, left: number, right: number): void {
        if (left === right) {
            this.tree[node] = this.arr[left];
            return;
        }
        const mid = (left + right) >> 1;
        this.build(node * 2 + 1, left, mid);
        this.build(node * 2 + 2, mid + 1, right);
        this.tree[node] = this.tree[node * 2 + 1] + this.tree[node * 2 + 2];
    }

    update(idx: number, value: number): void {
        const diff = value - this.arr[idx];
        this.arr[idx] = value;
        this.updateTree(0, 0, this.length - 1, idx, diff);
    }

    private updateTree(node: number, left: number, right: number, idx: number, diff: number): void {
        if (idx < left || idx > right) return;
        this.tree[node] += diff;
        if (left === right) return;
        const mid = (left + right) >> 1;
        this.updateTree(node * 2 + 1, left, mid, idx, diff);
        this.updateTree(node * 2 + 2, mid + 1, right, idx, diff);
    }

    query(left: number, right: number): number {
        return this.queryTree(0, 0, this.length - 1, left, right);
    }

    private queryTree(node: number, left: number, right: number, ql: number, qr: number): number {
        if (ql <= left && right <= qr) return this.tree[node];
        if (right < ql || left > qr) return 0;
        const mid = (left + right) >> 1;
        return this.queryTree(node * 2 + 1, left, mid, ql, qr) +
               this.queryTree(node * 2 + 2, mid + 1, right, ql, qr);
    }
}
