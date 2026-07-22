// === Bubble Sort ===
//
// Repeatedly steps through the array, compares adjacent elements,
// and swaps them if they are in the wrong order. Each pass
// bubbles the largest unsorted element to its correct position.
//
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
