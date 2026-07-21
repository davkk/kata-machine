// === Ring Buffer ===
//
// A FIFO buffer with indexed access backed by an internal array.
// push appends an element, pop removes the oldest element, and get
// retrieves an element by its position (0 = oldest).
//
// Steps:
// 1. Maintain an internal array and a length counter
// 2. push: append the item to the end of the array
// 3. pop: remove and return the first (oldest) element
// 4. get: return the element at the given index

export default class RingBuffer<T> {
    public length: number;
    private arr: T[];

    constructor() {
        this.length = 0;
        this.arr = [];
    }

    push(item: T): void {
        this.arr.push(item);
        this.length++;
    }

    get(idx: number): T | undefined {
        return this.arr[idx];
    }

    pop(): T | undefined {
        if (this.length === 0) return undefined;
        const val = this.arr.shift();
        this.length--;
        return val;
    }
}
