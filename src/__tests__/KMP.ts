import kmp_search from "@code/KMP";

test("kmp search", function () {
    expect(kmp_search("abcxabcdabcdabcy", "abcdabcy")).toEqual(8);
    expect(kmp_search("hello world", "world")).toEqual(6);
    expect(kmp_search("hello world", "xyz")).toEqual(-1);
    expect(kmp_search("", "a")).toEqual(-1);
    expect(kmp_search("a", "")).toEqual(0);
    expect(kmp_search("mississippi", "issip")).toEqual(4);
    expect(kmp_search("aaaaab", "aaab")).toEqual(2);
});
