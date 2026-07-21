// === Queue ===
//
// FIFO (First-In-First-Out) data structure. Elements are added at
// the tail and removed from the head. All operations are O(1).
//
// Steps:
// 1. Maintain head and tail pointers plus a length counter
// 2. enqueue: create a new node after tail, advance tail
// 3. deque: remove the head node, advance head
// 4. peek: return the head node's value without removing it

export default class Queue<T> {
    public length: number;
    private head?: ListNode<T>;
    private tail?: ListNode<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    enqueue(item: T): void {
        const node: ListNode<T> = { value: item };
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    deque(): T | undefined {
        if (!this.head) return undefined;
        const val = this.head.value;
        this.head = this.head.next;
        if (!this.head) this.tail = undefined;
        this.length--;
        return val;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
