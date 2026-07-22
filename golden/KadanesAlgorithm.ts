// === Kadane's Algorithm (Maximum Subarray) ===
//
// Finds the contiguous subarray with the largest sum in O(n) time.
//
// Steps:
// 1. Track max_ending_here and max_so_far, both start at nums[0]
// 2. For each element, decide: extend current subarray or start fresh
// 3. max_ending_here = max(nums[i], max_ending_here + nums[i])
// 4. max_so_far = max(max_so_far, max_ending_here)
//
// Example:
// Maximum profit from stock price history, signal processing
//
export default function max_subarray(nums: number[]): number {
    let max = nums[0];
    let current = nums[0];
    for (let i = 1; i < nums.length; i++) {
        current = Math.max(nums[i], current + nums[i]);
        max = Math.max(max, current);
    }
    return max;
}
