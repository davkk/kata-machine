import longest_common_subsequence from "@code/LongestCommonSubsequence";

test("longest common subsequence", function () {
    expect(longest_common_subsequence("abcde", "ace")).toEqual(3);
    expect(longest_common_subsequence("abc", "abc")).toEqual(3);
    expect(longest_common_subsequence("abc", "def")).toEqual(0);
    expect(longest_common_subsequence("", "abc")).toEqual(0);
    expect(longest_common_subsequence("AGGTAB", "GXTXAYB")).toEqual(4);
});
