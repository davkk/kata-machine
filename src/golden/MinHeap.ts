// === Min Heap ===
//
// Binary min-heap with insert and delete (extract min) operations.
// Uses an array-based complete binary tree where parent is always <= children.
//
// Steps:
// 1. insert(value): push to end, bubble up while parent > value, swap.
// 2. delete(): swap root with last, pop last, bubble down comparing children.
// 3. length getter returns current heap size.

export default class MinHeap {
    public length: number = 0;
    private data: number[] = [];

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }

    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }

    private bubbleUp(idx: number): void {
        if (idx === 0) return;
        const p = this.parent(idx);
        if (this.data[p] > this.data[idx]) {
            [this.data[p], this.data[idx]] = [this.data[idx], this.data[p]];
            this.bubbleUp(p);
        }
    }

    private bubbleDown(idx: number): void {
        const l = this.leftChild(idx);
        const r = this.rightChild(idx);
        let smallest = idx;

        if (l < this.length && this.data[l] < this.data[smallest]) {
            smallest = l;
        }
        if (r < this.length && this.data[r] < this.data[smallest]) {
            smallest = r;
        }
        if (smallest !== idx) {
            [this.data[smallest], this.data[idx]] = [this.data[idx], this.data[smallest]];
            this.bubbleDown(smallest);
        }
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.bubbleUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) return -1;
        const out = this.data[0];
        this.length--;
        if (this.length === 0) {
            this.data = [];
            return out;
        }
        this.data[0] = this.data[this.length];
        this.bubbleDown(0);
        return out;
    }
}
