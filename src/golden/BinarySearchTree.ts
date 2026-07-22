export default class BinarySearchTree {
    private root: BinaryNode<number> | null = null;
    public length: number = 0;

    insert(value: number): void {
        const node: BinaryNode<number> = { value, left: null, right: null };
        if (!this.root) {
            this.root = node;
            this.length++;
            return;
        }
        let curr = this.root;
        while (true) {
            if (value < curr.value) {
                if (!curr.left) {
                    curr.left = node;
                    this.length++;
                    return;
                }
                curr = curr.left;
            } else {
                if (!curr.right) {
                    curr.right = node;
                    this.length++;
                    return;
                }
                curr = curr.right;
            }
        }
    }

    delete(value: number): void {
        let curr: BinaryNode<number> | null = this.root;
        let parent: BinaryNode<number> | null = null;

        while (curr && curr.value !== value) {
            parent = curr;
            curr = value < curr.value ? curr.left : curr.right;
        }

        if (!curr) return;
        this.length--;

        if (!curr.left && !curr.right) {
            if (!parent) { this.root = null; return; }
            if (parent.left === curr) parent.left = null;
            else parent.right = null;
            return;
        }

        if (!curr.left || !curr.right) {
            const child = curr.left || curr.right;
            if (!parent) { this.root = child; return; }
            if (parent.left === curr) parent.left = child;
            else parent.right = child;
            return;
        }

        let succ = curr.right;
        let succParent = curr;
        while (succ.left) {
            succParent = succ;
            succ = succ.left;
        }

        curr.value = succ.value;

        if (succParent.left === succ) succParent.left = succ.right;
        else succParent.right = succ.right;
    }

    find(value: number): BinaryNode<number> | null {
        let curr = this.root;
        while (curr) {
            if (value === curr.value) return curr;
            curr = value < curr.value ? curr.left : curr.right;
        }
        return null;
    }
}
