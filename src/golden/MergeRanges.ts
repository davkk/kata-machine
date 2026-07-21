// === Merge Intervals ===
//
// Given an array of intervals [start, end], merge all overlapping
// intervals and return the non-overlapping intervals sorted by start.
//
// Steps:
// 1. Sort intervals by start time
// 2. Initialize result with the first interval
// 3. For each interval, check if it overlaps with last in result
// 4. If overlapping, merge by extending the end
// 5. If not, append the interval to result
//
export default function merge_ranges(intervals: [number, number][]): [number, number][] {
    if (intervals.length === 0) return [];
    const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
    const result: [number, number][] = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
        const last = result[result.length - 1];
        if (sorted[i][0] <= last[1]) {
            last[1] = Math.max(last[1], sorted[i][1]);
        } else {
            result.push(sorted[i]);
        }
    }
    return result;
}
