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
