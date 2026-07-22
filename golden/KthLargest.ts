// === Kth Largest Element (Quickselect) ===
//
// Finds the kth largest element in an unsorted array using the
// Quickselect algorithm (Hoare's selection). O(n) average time.
//
// Steps:
// 1. Target index = nums.length - k
// 2. Partition array around a pivot (last element)
// 3. If pivot index == target, return nums[pivot]
// 4. If pivot < target, search right half
// 5. If pivot > target, search left half
//
// Example:
// Leaderboard ranking, finding percentile scores in test results
//
export default function kth_largest(nums: number[], k: number): number {
    const target = nums.length - k;
    function partition(lo: number, hi: number): number {
        const pivot = nums[hi];
        let i = lo;
        for (let j = lo; j < hi; j++) {
            if (nums[j] <= pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        [nums[i], nums[hi]] = [nums[hi], nums[i]];
        return i;
    }
    let lo = 0;
    let hi = nums.length - 1;
    while (lo < hi) {
        const p = partition(lo, hi);
        if (p === target) return nums[p];
        if (p < target) lo = p + 1;
        else hi = p - 1;
    }
    return nums[lo];
}
