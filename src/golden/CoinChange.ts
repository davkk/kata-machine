// === Coin Change (Dynamic Programming) ===
//
// Given a target amount and coin denominations, find the minimum
// number of coins needed to make that amount. Returns -1 if impossible.
//
// Steps:
// 1. Initialize dp[0..amount] with Infinity, dp[0] = 0
// 2. For each amount from 1..target, try every coin
// 3. If coin <= amount, dp[amount] = min(dp[amount], dp[amount-coin] + 1)
// 4. Return dp[amount] if finite, else -1
//
export default function coin_change(amount: number, coins: number[]): number {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}
