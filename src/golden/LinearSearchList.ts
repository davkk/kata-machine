// === Linear Search ===
//
// Sequentially checks each element in the array until the target
// value is found or the end is reached.
//
// Steps:
// 1. Loop through every element in the array
// 2. If the current element equals the needle, return true
// 3. If the loop finishes without finding a match, return false

export default function linear_search(haystack: number[], needle: number): boolean {
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle) return true;
    }
    return false;
}
