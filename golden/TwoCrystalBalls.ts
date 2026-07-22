// === Two Crystal Balls ===
//
// Given two crystal balls that break when dropped from a certain
// height (or above), find the exact floor at which they break,
// minimizing the worst-case number of drops.
//
// Steps:
// 1. Calculate jump size = sqrt(n) for optimal worst-case
// 2. First ball: jump by sqrt(n) until it breaks
// 3. Second ball: from the last safe position, walk forward one
//    floor at a time until the ball breaks
// 4. Return the index where the break occurs, or -1 if none
//
// Example:
// Finding the exact failure threshold in test environments (e.g., drop height)

export default function two_crystal_balls(breaks: boolean[]): number {
    const jump = Math.floor(Math.sqrt(breaks.length));
    let i = jump;
    for (; i < breaks.length; i += jump) {
        if (breaks[i]) break;
    }
    i -= jump;
    for (let j = 0; j <= jump && i < breaks.length; j++, i++) {
        if (breaks[i]) return i;
    }
    return -1;
}
