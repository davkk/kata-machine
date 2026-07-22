// A fixed-capacity FIFO buffer backed by a circular array.
// push adds an element at the tail, pop removes from the head.
// When the tail or head reaches the end of the array, they wrap
// around to index 0 — that's the "ring".
//
export default class RingBuffer<T> {
    public length: number;
    private capacity: number;
    private head: number;
    private tail: number;
    private buffer: (T | undefined)[];

    constructor(cap: number) {
        this.length = 0;
        this.capacity = cap;
        this.head = 0;
        this.tail = 0;
        this.buffer = new Array(cap);
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
