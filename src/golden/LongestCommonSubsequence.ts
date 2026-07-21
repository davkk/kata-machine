// === Longest Common Subsequence (Dynamic Programming) ===
//
// Given two strings, find the length of their longest common subsequence.
// A subsequence appears in the same order but not necessarily contiguous.
//
// Steps:
// 1. Create dp table of (m+1) x (n+1), initialized to 0
// 2. For each char in a, each char in b:
// 3.   If chars match, dp[i][j] = dp[i-1][j-1] + 1
// 4.   Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1])
// 5. Return dp[m][n]
//
export default function longest_common_subsequence(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}
