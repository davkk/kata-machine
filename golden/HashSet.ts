// === HashSet ===
//
// A hash set implementation using separate chaining with linked list buckets.
// Stores unique integer keys with O(1) average time for add, remove, and contains.
//
// Steps:
// 1. Maintain an array of bucket heads, each bucket is a linked list of keys
// 2. hash(key): multiply by golden ratio constant, mod by capacity
// 3. add: hash key, traverse bucket; if not found, prepend a new node
// 4. remove: hash key, traverse bucket; splice out the matching node
// 5. contains: hash key, traverse bucket looking for the key
// 6. Resize at 75% load factor to maintain performance
//
// Example:
// Duplicate detection in web crawlers, membership checks in compilers

class BucketNode {
    key: number;
    next?: BucketNode;

    constructor(key: number) {
        this.key = key;
    }
}

export default class HashSet {
    public length: number;
    private capacity: number;
    private buckets: (BucketNode | undefined)[];

    constructor() {
        this.length = 0;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    private hash(key: number): number {
        return ((key * 2654435761) >>> 0) % this.capacity;
    }

    private resize(): void {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity);
        this.length = 0;
        for (const node of oldBuckets) {
            let cur = node;
            while (cur) {
                this.add(cur.key);
                cur = cur.next;
            }
        }
    }

    add(key: number): void {
        if (this.length >= this.capacity * 0.75) {
            this.resize();
        }
        const idx = this.hash(key);
        let cur = this.buckets[idx];
        while (cur) {
            if (cur.key === key) return;
            cur = cur.next;
        }
        const node = new BucketNode(key);
        node.next = this.buckets[idx];
        this.buckets[idx] = node;
        this.length++;
    }

    remove(key: number): void {
        const idx = this.hash(key);
        let cur = this.buckets[idx];
        let prev: BucketNode | undefined;
        while (cur) {
            if (cur.key === key) {
                if (prev) {
                    prev.next = cur.next;
                } else {
                    this.buckets[idx] = cur.next;
                }
                this.length--;
                return;
            }
            prev = cur;
            cur = cur.next;
        }
    }

    contains(key: number): boolean {
        const idx = this.hash(key);
        let cur = this.buckets[idx];
        while (cur) {
            if (cur.key === key) return true;
            cur = cur.next;
        }
        return false;
    }
}
