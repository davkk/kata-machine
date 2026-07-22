// === 0/1 Knapsack (Dynamic Programming) ===
//
// Given capacity and items with weights/values, find the maximum
// value that can be carried. Each item can be taken at most once.
//
// Steps:
// 1. Create dp table of (n+1) x (capacity+1), initialized to 0
// 2. For each item i, for each weight w:
// 3.   If item fits, dp[i][w] = max(skip, take)
// 4.   skip = dp[i-1][w], take = dp[i-1][w-w_i] + v_i
// 5. Return dp[n][capacity]
//
// Example:
// Resource allocation (budget, cargo), portfolio optimization
//
export default function knapsack(capacity: number, weights: number[], values: number[]): number {
    const n = weights.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}
