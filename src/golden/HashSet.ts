// === HashSet ===
//
// A hash set implementation using separate chaining. Stores unique
// integer keys with O(1) average time for add, remove, and contains.
//
// Steps:
// 1. Maintain array of buckets, each bucket is an array of keys
// 2. hash(key): multiply by golden ratio constant, mod by capacity
// 3. add: hash key, append to bucket if not already present
// 4. remove: hash key, splice from bucket if found
// 5. contains: hash key, check bucket for the key
// 6. Resize at 75% load factor to maintain performance
//
export default class HashSet {
    public length: number;
    private buckets: number[][];
    private capacity: number;

    constructor() {
        this.length = 0;
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    private hash(key: number): number {
        return ((key * 2654435761) >>> 0) % this.capacity;
    }

    private resize(): void {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.length = 0;
        for (const bucket of oldBuckets) {
            for (const key of bucket) {
                this.add(key);
            }
        }
    }

    add(key: number): void {
        if (this.length >= this.capacity * 0.75) {
            this.resize();
        }
        const idx = this.hash(key);
        if (!this.buckets[idx].includes(key)) {
            this.buckets[idx].push(key);
            this.length++;
        }
    }

    remove(key: number): void {
        const idx = this.hash(key);
        const bucket = this.buckets[idx];
        const pos = bucket.indexOf(key);
        if (pos !== -1) {
            bucket.splice(pos, 1);
            this.length--;
        }
    }

    contains(key: number): boolean {
        const idx = this.hash(key);
        return this.buckets[idx].includes(key);
    }
}
