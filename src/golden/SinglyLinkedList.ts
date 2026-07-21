// === Singly Linked List ===
//
// A linear data structure where each node holds a value and a pointer
// to the next node. Supports O(n) access and insertion/removal by index.
//
// Steps:
// 1. Maintain a head pointer and a length counter
// 2. append: traverse to the last node and link the new node
// 3. prepend: point new node at current head, update head
// 4. get/insertAt/removeAt: traverse from head to the target index
// 5. remove(item): traverse, find node by value, splice it out

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: ListNode<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    prepend(item: T): void {
        const node: ListNode<T> = { value: item, next: this.head };
        this.head = node;
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            this.prepend(item);
            return;
        }
        if (idx === this.length) {
            this.append(item);
            return;
        }
        const prev = this.getNode(idx - 1);
        if (!prev) return;
        prev.next = { value: item, next: prev.next };
        this.length++;
    }

    append(item: T): void {
        const node: ListNode<T> = { value: item };
        if (!this.head) {
            this.head = node;
        } else {
            let cur = this.head;
            while (cur.next) cur = cur.next;
            cur.next = node;
        }
        this.length++;
    }

    remove(item: T): T | undefined {
        if (!this.head) return undefined;
        if (this.head.value === item) {
            const val = this.head.value;
            this.head = this.head.next;
            this.length--;
            return val;
        }
        let cur = this.head;
        while (cur.next) {
            if (cur.next.value === item) {
                const val = cur.next.value;
                cur.next = cur.next.next;
                this.length--;
                return val;
            }
            cur = cur.next;
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx === 0) {
            if (!this.head) return undefined;
            const val = this.head.value;
            this.head = this.head.next;
            this.length--;
            return val;
        }
        const prev = this.getNode(idx - 1);
        if (!prev || !prev.next) return undefined;
        const val = prev.next.value;
        prev.next = prev.next.next;
        this.length--;
        return val;
    }

    private getNode(idx: number): ListNode<T> | undefined {
        if (idx < 0 || idx >= this.length) return undefined;
        let cur = this.head;
        for (let i = 0; i < idx && cur; i++) cur = cur.next;
        return cur;
    }
}
