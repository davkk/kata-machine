// === Permutations ===
//
// Generates all possible orderings of an array of distinct numbers.
// Uses backtracking with swapping to avoid extra space for tracking used elements.
//
// Steps:
// 1. Use backtracking with a start index
// 2. Base case: when start reaches the array length, save a copy
// 3. For each i from start to end: swap elements at start and i, recurse, swap back
//
// Example:
// Generating all possible orderings (traveling salesman, anagram solver)

export default function permutations(nums: number[]): number[][] {
    const result: number[][] = [];
    function backtrack(start: number) {
        if (start === nums.length) {
            result.push([...nums]);
            return;
        }
        for (let i = start; i < nums.length; i++) {
            [nums[start], nums[i]] = [nums[i], nums[start]];
            backtrack(start + 1);
            [nums[start], nums[i]] = [nums[i], nums[start]];
        }
    }
    backtrack(0);
    return result;
}
