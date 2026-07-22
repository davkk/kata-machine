// === Median Finder (Two Heaps) ===
//
// Maintains the median of a stream of numbers using two heaps:
// a max-heap for the lower half and a min-heap for the upper half.
//
// Steps:
// 1. Insert: add to appropriate heap based on comparison with max-heap root
// 2. Rebalance: ensure max-heap size >= min-heap size, difference <= 1
// 3. GetMedian: if odd count, return max-heap root; if even, return average of both roots
// 4. Heaps are implemented as arrays with bubble-up and bubble-down operations
//
// Example:
// Real-time median of streaming sensor data or stock prices
//
export default class MedianFinder {
    private lo: number[] = [];
    private hi: number[] = [];
    length: number = 0;

    insert(value: number): void {
        if (this.lo.length === 0 || value <= -this.lo[0]) {
            this.lo[this.lo.length] = -value;
            this.bubbleUpLo(this.lo.length - 1);
        } else {
            this.hi[this.hi.length] = value;
            this.bubbleUpHi(this.hi.length - 1);
        }
        if (this.lo.length > this.hi.length + 1) {
            const val = -this.lo[0];
            this.removeLoRoot();
            this.hi[this.hi.length] = val;
            this.bubbleUpHi(this.hi.length - 1);
        } else if (this.hi.length > this.lo.length) {
            const val = this.hi[0];
            this.removeHiRoot();
            this.lo[this.lo.length] = -val;
            this.bubbleUpLo(this.lo.length - 1);
        }
        this.length++;
    }

    getMedian(): number {
        if (this.lo.length > this.hi.length) return -this.lo[0];
        return (-this.lo[0] + this.hi[0]) / 2;
    }

    private bubbleUpLo(idx: number): void {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (this.lo[idx] >= this.lo[parent]) break;
            [this.lo[idx], this.lo[parent]] = [this.lo[parent], this.lo[idx]];
            idx = parent;
        }
    }

    private bubbleUpHi(idx: number): void {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (this.hi[idx] >= this.hi[parent]) break;
            [this.hi[idx], this.hi[parent]] = [this.hi[parent], this.hi[idx]];
            idx = parent;
        }
    }

    private removeLoRoot(): void {
        this.lo[0] = this.lo[this.lo.length - 1];
        this.lo.length--;
        let idx = 0;
        const n = this.lo.length;
        while (true) {
            let smallest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            if (left < n && this.lo[left] < this.lo[smallest]) smallest = left;
            if (right < n && this.lo[right] < this.lo[smallest]) smallest = right;
            if (smallest === idx) break;
            [this.lo[idx], this.lo[smallest]] = [this.lo[smallest], this.lo[idx]];
            idx = smallest;
        }
    }

    private removeHiRoot(): void {
        this.hi[0] = this.hi[this.hi.length - 1];
        this.hi.length--;
        let idx = 0;
        const n = this.hi.length;
        while (true) {
            let smallest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            if (left < n && this.hi[left] < this.hi[smallest]) smallest = left;
            if (right < n && this.hi[right] < this.hi[smallest]) smallest = right;
            if (smallest === idx) break;
            [this.hi[idx], this.hi[smallest]] = [this.hi[smallest], this.hi[idx]];
            idx = smallest;
        }
    }
}
