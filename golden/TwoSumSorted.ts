// === Two Sum II (Two Pointers) ===
//
// Given a sorted array and a target, find two numbers that sum to target.
// Returns 1-indexed indices. Uses two-pointer technique.
//
// Steps:
// 1. Initialize left = 0, right = n - 1
// 2. While left < right:
// 3.   If sum == target, return [left + 1, right + 1]
// 4.   If sum < target, increment left
// 5.   If sum > target, decrement right
//
// Example:
// Finding two products that sum to a budget in a sorted price list
//
export default function two_sum_sorted(nums: number[], target: number): [number, number] {
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
        const sum = nums[l] + nums[r];
        if (sum === target) {
            return [l + 1, r + 1];
        } else if (sum < target) {
            l++;
        } else {
            r--;
        }
    }
    return [-1, -1];
}
