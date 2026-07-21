// === LRU Cache ===
//
// Least Recently Used (LRU) cache with O(1) get and update operations.
// Combines a doubly linked list (access-order tracking) and a hash map
// (fast key lookup). The head is the most recently used item, the tail
// is the least recently used and is evicted first.
//
// Steps:
// 1. When get(key) is called: if the key exists, move its node to the
//    head (most recent) and return the value
// 2. When update(key, value) is called: if the key exists, update its
//    value and move the node to the head; otherwise create a new node
// 3. If the cache is at capacity when inserting a new key, evict the
//    tail (least recently used) before inserting
// 4. moveToHead: detach the node from its current position and re-insert
//    it at the front of the doubly linked list

type LRUNode<K, V> = {
    key: K;
    value: V;
    next?: LRUNode<K, V>;
    prev?: LRUNode<K, V>;
};

export default class LRU<K, V> {
    private capacity: number;
    private map: Map<K, LRUNode<K, V>>;
    private head?: LRUNode<K, V>;
    private tail?: LRUNode<K, V>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = undefined;
        this.tail = undefined;
    }

    get(key: K): V | undefined {
        const node = this.map.get(key);
        if (!node) return undefined;
        this.detach(node);
        this.prepend(node);
        return node.value;
    }

    update(key: K, value: V): void {
        const existing = this.map.get(key);
        if (existing) {
            existing.value = value;
            this.detach(existing);
            this.prepend(existing);
            return;
        }
        if (this.map.size >= this.capacity) {
            const evict = this.tail;
            if (evict) {
                this.detach(evict);
                this.map.delete(evict.key);
            }
        }
        const node: LRUNode<K, V> = { key, value };
        this.map.set(key, node);
        this.prepend(node);
    }

    private detach(node: LRUNode<K, V>): void {
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        if (node === this.head) this.head = node.next;
        if (node === this.tail) this.tail = node.prev;
        node.next = undefined;
        node.prev = undefined;
    }

    private prepend(node: LRUNode<K, V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
}
