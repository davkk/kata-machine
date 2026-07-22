// === Map (Hash Map) ===
//
// Hash map implementation with generic key (string | number) and value types.
// Uses separate chaining with linked list buckets for collision resolution.
//
// Steps:
// 1. Maintain an array of bucket heads and a count of key-value pairs
// 2. hash(key): convert key to string, sum char codes, mod by capacity
// 3. get(key): hash, traverse bucket, return value if found
// 4. set(key, value): hash, traverse bucket; update if found, prepend if not
// 5. delete(key): hash, traverse bucket; splice out the matching node
// 6. size(): return the current count
//
// Example:
// Associative arrays, JSON parsing, memoization caches

class MapNode<K extends string | number, V> {
    key: K;
    value: V;
    next?: MapNode<K, V>;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

export default class MyMap<T extends string | number, V> {
    private buckets: (MapNode<T, V> | undefined)[];
    private count: number;
    private capacity: number;

    constructor(capacity: number = 16) {
        this.capacity = capacity;
        this.count = 0;
        this.buckets = new Array(capacity);
    }

    private hash(key: T): number {
        const s = String(key);
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = (h * 31 + s.charCodeAt(i)) >>> 0;
        }
        return h % this.capacity;
    }

    get(key: T): V | undefined {
        const idx = this.hash(key);
        let cur = this.buckets[idx];
        while (cur) {
            if (cur.key === key) return cur.value;
            cur = cur.next;
        }
        return undefined;
    }

    set(key: T, value: V): void {
        const idx = this.hash(key);
        let cur = this.buckets[idx];
        while (cur) {
            if (cur.key === key) {
                cur.value = value;
                return;
            }
            cur = cur.next;
        }
        const node = new MapNode(key, value);
        node.next = this.buckets[idx];
        this.buckets[idx] = node;
        this.count++;
    }

    delete(key: T): void {
        const idx = this.hash(key);
        let cur = this.buckets[idx];
        let prev: MapNode<T, V> | undefined;
        while (cur) {
            if (cur.key === key) {
                if (prev) {
                    prev.next = cur.next;
                } else {
                    this.buckets[idx] = cur.next;
                }
                this.count--;
                return;
            }
            prev = cur;
            cur = cur.next;
        }
    }

    size(): number {
        return this.count;
    }
}
