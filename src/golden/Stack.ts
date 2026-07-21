// === Stack ===
//
// LIFO (Last-In-First-Out) data structure. Elements are added and
// removed from the top (head). All operations are O(1).
//
// Steps:
// 1. Maintain a head pointer and a length counter
// 2. push: create a new node and point it at the current head, update head
// 3. pop: remove the head node and return its value, update head
// 4. peek: return the head node's value without removing it

export default class Stack<T> {
    public length: number;
    private head?: ListNode<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        const node: ListNode<T> = { value: item, next: this.head };
        this.head = node;
        this.length++;
    }

    pop(): T | undefined {
        if (!this.head) return undefined;
        const val = this.head.value;
        this.head = this.head.next;
        this.length--;
        return val;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
