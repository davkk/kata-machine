// === Sliding Window Maximum ===
//
// Given an array and window size k, find the maximum in each sliding
// window using a monotonic deque. O(n) time.
//
// Steps:
// 1. Maintain a deque of indices with decreasing values
// 2. For each element, pop smaller values from back, then push index
// 3. Remove indices outside the window from front
// 4. Once window is full, record max = nums[deque[0]]
//
export default function sliding_window_max(nums: number[], k: number): number[] {
    const result: number[] = [];
    const deque: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        deque.push(i);
        if (deque[0] <= i - k) {
            deque.shift();
        }
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
}
