// === Daily Temperatures (Monotonic Stack) ===
//
// Given daily temperatures, for each day find how many days until
// a warmer temperature. Uses a monotonic decreasing stack.
//
// Steps:
// 1. Initialize result array with 0s
// 2. Maintain a stack of indices with decreasing temperatures
// 3. For each day, pop colder days from stack and set result[popped] = i - popped
// 4. Push current index onto stack
//
export default function daily_temperatures(temperatures: number[]): number[] {
    const result = new Array(temperatures.length).fill(0);
    const stack: number[] = [];
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            const idx = stack.pop()!;
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    return result;
}
