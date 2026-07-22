// === Subsets (Backtracking) ===
//
// Given an array of distinct numbers, generate all possible subsets
// (the power set) using backtracking.
//
// Steps:
// 1. Initialize result array
// 2. Define recursive backtrack(start, current) function
// 3. Add current subset to result
// 4. For each index from start to end, add nums[i] to current, recurse, then remove
// 5. Return all subsets
//
// Example:
// Power set generation, feature selection, enumerating all combinations
//
export default function subsets(nums: number[]): number[][] {
    const result: number[][] = [];
    function backtrack(start: number, curr: number[]) {
        result.push([...curr]);
        for (let i = start; i < nums.length; i++) {
            curr.push(nums[i]);
            backtrack(i + 1, curr);
            curr.pop();
        }
    }
    backtrack(0, []);
    return result;
}
