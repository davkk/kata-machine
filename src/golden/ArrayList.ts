// === Array List ===
//
// A dynamic array-backed list that doubles in capacity when full.
// Provides O(1) amortized append, O(n) prepend/insert/remove.
//
// Steps:
// 1. Maintain an internal array, length counter, and capacity
// 2. append: write at index length, increment; grow if full
// 3. prepend/insertAt: shift elements right from the target index
// 4. removeAt: shift elements left from the target index
// 5. remove(item): find the item by linear scan, then call removeAt

export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private arr: (T | undefined)[];

    constructor(capacity: number) {
        this.length = 0;
        this.capacity = capacity;
        this.arr = new Array(capacity);
    }

    prepend(item: T): void {
        this.insertAt(item, 0);
    }

    insertAt(item: T, idx: number): void {
        if (this.length >= this.capacity) this.grow();
        for (let i = this.length; i > idx; i--) this.arr[i] = this.arr[i - 1];
        this.arr[idx] = item;
        this.length++;
    }

    append(item: T): void {
        if (this.length >= this.capacity) this.grow();
        this.arr[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (this.arr[i] === item) return this.removeAt(i);
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) return undefined;
        return this.arr[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) return undefined;
        const val = this.arr[idx];
        for (let i = idx; i < this.length - 1; i++) this.arr[i] = this.arr[i + 1];
        this.arr[this.length - 1] = undefined;
        this.length--;
        return val;
    }

    private grow(): void {
        this.capacity *= 2;
        const newArr = new Array(this.capacity);
        for (let i = 0; i < this.length; i++) newArr[i] = this.arr[i];
        this.arr = newArr;
    }
}
