// === Insertion Sort ===
//
// Builds the final sorted array one element at a time by repeatedly
// taking the next element and inserting it into the correct position
// among the already-sorted elements.
//
// Steps:
// 1. Start from index 1 (assume first element is sorted)
// 2. Pick arr[i] as the current value to insert
// 3. Shift all larger elements in the sorted portion right by one
// 4. Place the current value in its correct position
// 5. Repeat until the entire array is sorted

export default function insertion_sort(arr: number[]): void {
    for (let i = 1; i < arr.length; i++) {
        const curr = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > curr) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = curr;
    }
}
