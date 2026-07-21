// === Binary Search ===
//
// Efficiently finds a target value in a sorted array by repeatedly
// dividing the search interval in half.
//
// Steps:
// 1. Set low to 0 and high to the array length (exclusive)
// 2. While low < high, calculate mid = Math.floor((low + high) / 2)
// 3. If the value at mid equals needle, return true
// 4. If needle < arr[mid], search the left half (high = mid)
// 5. If needle > arr[mid], search the right half (low = mid + 1)
// 6. If the loop exits, the needle is not in the array; return false

export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        const val = haystack[mid];
        if (val === needle) return true;
        if (val < needle) lo = mid + 1;
        else hi = mid;
    }
    return false;
}
