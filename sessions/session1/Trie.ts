// A trie for lowercase string insertion, deletion, and prefix search.
// Each node has a map of child nodes and a boolean flag for end-of-word.
//
class TrieNode {
    children = new Map<string, TrieNode>;
    isWord = false;
}

export default class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(item: string): void {
        let curr = this.root;
        for (const ch of item) {
            const node = curr.children.get(ch) ?? new TrieNode();
            curr.children.set(ch, node);
            curr = node;
        }
        curr.isWord = true;
    }

    delete(item: string): void {
        let curr = this.root;
        for (const ch of item) {
            const node = curr.children.get(ch)
            if (!node) return;
            curr = node;
        }
        curr.isWord = false;
    }

    find(partial: string): string[] {
        let curr = this.root;
        for (const ch of partial) {
            if (!curr.children.has(ch)) return [];
            curr = curr.children.get(ch)!;
        }

        const results: string[] = [];
        this.collect(curr, partial, results);
        return results;
    }

    private collect(node: TrieNode, prefix: string, out: string[]): void {
        if (node.isWord) out.push(prefix);
        for (const [ch, child] of node.children) {
            this.collect(child, prefix + ch, out);
        }
    }
}
