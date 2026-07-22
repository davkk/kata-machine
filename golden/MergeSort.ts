// === Merge Sort ===
//
// A divide-and-conquer sorting algorithm that recursively splits
// the array into halves, sorts each half, then merges the sorted
// halves back together.
//
// Steps:
// 1. If the array has 0 or 1 element, it is already sorted (base case)
// 2. Find the midpoint and recursively sort left and right halves
// 3. Merge the two sorted halves by comparing elements from each
// 4. Copy remaining elements from whichever half still has values
// 5. Copy merged result back into the original array
//
// Example:
// External sorting (files too large for memory), stable sort requirements

export default function merge_sort(arr: number[]): void {
    if (arr.length <= 1) return;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    merge_sort(left);
    merge_sort(right);

    let i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}
