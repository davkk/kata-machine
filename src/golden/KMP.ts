// === Knuth-Morris-Pratt (KMP) String Search ===
//
// Efficient string matching algorithm that avoids re-examining
// previously matched characters. O(n + m) time complexity.
//
// Steps:
// 1. Build LPS (Longest Prefix Suffix) array for the pattern
// 2. LPS[i] = length of longest proper prefix that is also suffix for pattern[0..i]
// 3. Scan text with i, match pattern with j
// 4. On mismatch, use LPS to skip ahead: j = lps[j - 1]
// 5. If j reaches pattern.length, match found at i - j
//
export default function kmp_search(text: string, pattern: string): number {
    if (pattern.length === 0) return 0;
    const lps = build_lps(pattern);
    let i = 0;
    let j = 0;
    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
            if (j === pattern.length) return i - j;
        } else if (j > 0) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }
    return -1;
}

function build_lps(pattern: string): number[] {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else if (len > 0) {
            len = lps[len - 1];
        } else {
            lps[i] = 0;
            i++;
        }
    }
    return lps;
}
