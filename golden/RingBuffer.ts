// === Ring Buffer ===
//
// A fixed-capacity FIFO buffer backed by a circular array.
// push adds an element at the tail, pop removes from the head.
// When the tail or head reaches the end of the array, they wrap
// around to index 0 — that's the "ring".
//
// Steps:
// 1. Maintain a fixed-size buffer, head, tail, and length
// 2. push: write item at buffer[tail], then tail = (tail + 1) % capacity
// 3. pop: read buffer[head], then head = (head + 1) % capacity
// 4. get: return buffer[(head + idx) % capacity]
//
// Example:
// Audio/video streaming buffers, logging, circular log in embedded systems

export default class RingBuffer<T> {
    public length: number;
    private capacity: number;
    private head: number;
    private tail: number;
    private buffer: (T | undefined)[];

    constructor(capacity: number = 3) {
        this.length = 0;
        this.capacity = capacity;
        this.head = 0;
        this.tail = 0;
        this.buffer = new Array(capacity);
    }

    push(item: T): void {
        if (this.length === this.capacity) {
            this.head = (this.head + 1) % this.capacity;
        } else {
            this.length++;
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) return undefined;
        return this.buffer[(this.head + idx) % this.capacity];
    }

    pop(): T | undefined {
        if (this.length === 0) return undefined;
        const val = this.buffer[this.head];
        this.buffer[this.head] = undefined;
        this.head = (this.head + 1) % this.capacity;
        this.length--;
        return val;
    }
}
