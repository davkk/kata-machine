// === Trie (Prefix Tree) ===
//
// A trie for lowercase string insertion, deletion, and prefix search.
// Each node has a map of child nodes and a boolean flag for end-of-word.
//
// Steps:
// 1. insert(item): walk characters, create nodes as needed, mark last as isWord.
// 2. delete(item): walk characters, unmark isWord (nodes remain for other words).
// 3. find(partial): walk to prefix node, DFS collect all complete words from there.

class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isWord = false;
}

export default class Trie {
    private root = new TrieNode();

    insert(item: string): void {
        let node = this.root;
        for (const ch of item) {
            if (!node.children.has(ch)) {
                node.children.set(ch, new TrieNode());
            }
            node = node.children.get(ch)!;
        }
        node.isWord = true;
    }

    delete(item: string): void {
        let node = this.root;
        for (const ch of item) {
            if (!node.children.has(ch)) return;
            node = node.children.get(ch)!;
        }
        node.isWord = false;
    }

    find(partial: string): string[] {
        let node = this.root;
        for (const ch of partial) {
            if (!node.children.has(ch)) return [];
            node = node.children.get(ch)!;
        }
        const results: string[] = [];
        this.collect(node, partial, results);
        return results;
    }

    private collect(node: TrieNode, prefix: string, out: string[]): void {
        if (node.isWord) out.push(prefix);
        for (const [ch, child] of node.children) {
            this.collect(child, prefix + ch, out);
        }
    }
}
