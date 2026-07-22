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
