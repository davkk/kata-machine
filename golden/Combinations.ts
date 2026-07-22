// === Combinations ===
//
// Generates all k-length combinations from numbers 1..n using backtracking.
// Each combination is a subset where order does not matter.
//
// Steps:
// 1. Use backtracking: at each step, choose the next number and recurse
// 2. Base case: when the current combination reaches length k, save it
// 3. Prune: start from the last chosen number + 1 to avoid duplicates
//
// Example:
// Lottery number generation, team selection, combinatorial search

export default function combinations(n: number, k: number): number[][] {
    const result: number[][] = [];
    function backtrack(start: number, curr: number[]) {
        if (curr.length === k) {
            result.push([...curr]);
            return;
        }
        for (let i = start; i <= n; i++) {
            curr.push(i);
            backtrack(i + 1, curr);
            curr.pop();
        }
    }
    backtrack(1, []);
    return result;
}
