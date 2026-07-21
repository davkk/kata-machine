// === Bubble Sort ===
//
// Repeatedly steps through the array, compares adjacent elements,
// and swaps them if they are in the wrong order. Each pass
// bubbles the largest unsorted element to its correct position.
//
// Steps:
// 1. Loop from i = 0 to n-1 (outer pass counter)
// 2. For each pass, loop from j = 0 to n-1-i
// 3. If arr[j] > arr[j+1], swap them
// 4. After all passes, the array is sorted

export default function bubble_sort(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}
