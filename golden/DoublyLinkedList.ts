// === Doubly Linked List ===
//
// A linear data structure where each node holds a value and pointers
// to both the next and previous nodes. Supports O(1) prepend/append.
//
// Steps:
// 1. Maintain head, tail pointers and a length counter
// 2. prepend: link new node before head, adjust head and prev links
// 3. append: link new node after tail, adjust tail and next links
// 4. removeNode: connect prev.next to node.next and node.next.prev to node.prev
// 5. get/insertAt/removeAt: traverse from head to target index
//
// Example:
// Browser back/forward history, music playlist with next/prev

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: ListNode<T>;
    private tail?: ListNode<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node: ListNode<T> = { value: item };
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) return this.prepend(item);
        if (idx === this.length) return this.append(item);
        const cur = this.getNode(idx);
        if (!cur) return;
        const node: ListNode<T> = { value: item, next: cur, prev: cur.prev };
        if (cur.prev) cur.prev.next = node;
        cur.prev = node;
        this.length++;
    }

    append(item: T): void {
        const node: ListNode<T> = { value: item };
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    remove(item: T): T | undefined {
        let cur = this.head;
        while (cur) {
            if (cur.value === item) {
                this.removeNode(cur);
                return cur.value;
            }
            cur = cur.next;
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNode(idx);
        if (!node) return undefined;
        this.removeNode(node);
        return node.value;
    }

    private removeNode(node: ListNode<T>): void {
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        if (node === this.head) this.head = node.next;
        if (node === this.tail) this.tail = node.prev;
        node.next = undefined;
        node.prev = undefined;
        this.length--;
    }

    private getNode(idx: number): ListNode<T> | undefined {
        if (idx < 0 || idx >= this.length) return undefined;
        let cur = this.head;
        for (let i = 0; i < idx && cur; i++) cur = cur.next;
        return cur;
    }
}
