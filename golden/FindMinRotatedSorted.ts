// === Find Minimum in Rotated Sorted Array ===
//
// Given a rotated sorted array with distinct values, find the minimum
// element in O(log n) time using modified binary search.
//
// Steps:
// 1. Binary search between lo and hi
// 2. If mid > hi, min is in right half (lo = mid + 1)
// 3. Otherwise, min is in left half (hi = mid)
// 4. When lo == hi, that's the minimum
//
// Example:
// Searching in a rotated log file or a circular price history
//
export default function find_min_rotated(nums: number[]): number {
    let lo = 0;
    let hi = nums.length - 1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (nums[mid] > nums[hi]) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return nums[lo];
}
