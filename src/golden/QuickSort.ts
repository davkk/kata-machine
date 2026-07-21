// === Quick Sort ===
//
// A divide-and-conquer sorting algorithm that selects a pivot,
// partitions the array so elements smaller than the pivot come
// before it and larger elements come after, then recursively
// sorts the sub-arrays.
//
// Steps:
// 1. Choose a pivot (usually the last element in the sub-array)
// 2. Partition: iterate with two pointers; swap elements so that
//    all values <= pivot are on the left side
// 3. Place the pivot in its correct sorted position
// 4. Recursively apply quick sort to left and right partitions
// 5. Base case: sub-array with 0 or 1 element is already sorted

function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];
    let idx = lo - 1;
    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;
    return idx;
}

function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) return;
    const pivotIdx = partition(arr, lo, hi);
    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
