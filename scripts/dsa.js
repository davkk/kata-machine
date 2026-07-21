const length_property = {
    properties: [{
        name: "length",
        type: "number",
        scope: "public",
    }]
};
const list_interface = {
    methods: [{
        name: "prepend",
        args: "item: T",
        return: "void",
    }, {
        name: "insertAt",
        args: "item: T, idx: number",
        return: "void",
    }, {
        name: "append",
        args: "item: T",
        return: "void",
    }, {
        name: "remove",
        args: "item: T",
        return: "T | undefined",
    }, {
        name: "get",
        args: "idx: number",
        return: "T | undefined",
    }, {
        name: "removeAt",
        args: "idx: number",
        return: "T | undefined",
    }],
    ...length_property,
};

module.exports = {
    LRU: {
        generic: "<K, V>",
        type: "class",
        methods: [{
            name: "update",
            args: "key: K, value: V",
            return: "void",
        }, {
            name: "get",
            args: "key: K",
            return: "V | undefined",
        }],
        properties: [{
            name: "length",
            type: "number",
            scope: "private",
        }]
    },
    MinHeap: {
        type: "class",
        methods: [{
            name: "insert",
            args: "value: number",
            return: "void",
        }, {
            name: "delete",
            args: "",
            return: "number",
        }],
        properties: [{
            name: "length",
            type: "number",
            scope: "public",
        }]
    },

    Map: {
        generic: "<T extends (string | number), V>",
        type: "class",
        methods: [{
            name: "get",
            args: "key: T",
            return: "V | undefined",
        }, {
            name: "set",
            args: "key: T, value: V",
            return: "void",
        }, {
            name: "delete",
            args: "key: T",
            return: "V | undefined",
        }, {
            name: "size",
            return: "number",
        }],
    },

    RingBuffer: {
        generic: "<T>",
        type: "class",
        methods: [{
            name: "push",
            args: "item: T",
            return: "void",
        }, {
            name: "get",
            args: "idx: number",
            return: "T | undefined",
        }, {
            name: "pop",
            return: "T | undefined",
        }],
        properties: [{
            name: "length",
            type: "number",
            scope: "public",
        }]
    },

    ArrayList: {
        type: "class",
        generic: "<T>",
        ...list_interface,
    },
    SinglyLinkedList: {
        generic: "<T>",
        type: "class",
        ...list_interface,
    },
    DoublyLinkedList: {
        generic: "<T>",
        type: "class",
        ...list_interface,
    },
    Queue: {
        generic: "<T>",
        type: "class",
        ...length_property,
        methods: [{
            name: "enqueue",
            args: "item: T",
            return: "void",
        }, {
            name: "deque",
            args: "",
            return: "T | undefined",
        }, {
            name: "peek",
            args: "",
            return: "T | undefined",
        }]
    },
    Stack: {
        generic: "<T>",
        type: "class",
        ...length_property,
        methods: [{
            name: "push",
            args: "item: T",
            return: "void",
        }, {
            name: "pop",
            args: "",
            return: "T | undefined",
        }, {
            name: "peek",
            args: "",
            return: "T | undefined",
        }]
    },

    Trie: {
        type: "class",
        methods: [{
            name: "insert",
            args: "item: string",
            return: "void",
        }, {
            name: "delete",
            args: "item: string",
            return: "void",
        }, {
            name: "find",
            args: "partial: string",
            return: "string[]",
        }]
    },

    BubbleSort: {
        type: "fn",
        fn: "bubble_sort",
        args: "arr: number[]",
        "return": "void",
    },

    InsertionSort: {
        type: "fn",
        fn: "insertion_sort",
        args: "arr: number[]",
        "return": "void",
    },

    MergeSort: {
        type: "fn",
        fn: "merge_sort",
        args: "arr: number[]",
        "return": "void",
    },

    QuickSort: {
        type: "fn",
        fn: "quick_sort",
        args: "arr: number[]",
        "return": "void",
    },

    DijkstraList: {
        type: "fn",
        fn: "dijkstra_list",
        args: "source: number, sink: number, arr: WeightedAdjacencyList",
        "return": "number[]",
    },

    PrimsList: {
        type: "fn",
        fn: "prims",
        args: "list: WeightedAdjacencyList",
        return: "WeightedAdjacencyList | null",
    },

    Kruskals: {
        type: "fn",
        fn: "kruskals",
        args: "list: WeightedAdjacencyList",
        return: "WeightedAdjacencyList | null",
    },

    BinarySearchList: {
        type: "fn",
        fn: "bs_list",
        args: "haystack: number[], needle: number",
        return: "boolean",
    },

    LinearSearchList: {
        type: "fn",
        fn: "linear_search",
        args: "haystack: number[], needle: number",
        return: "boolean",
    },

    TwoCrystalBalls: {
        type: "fn",
        fn: "two_crystal_balls",
        args: "breaks: boolean[]",
        return: "number",
    },

    MazeSolver: {
        type: "fn",
        fn: "solve",
        args: "maze: string[], wall: string, start: Point, end: Point",
        return: "Point[]",
    },

    BTPreOrder: {
        type: "fn",
        fn: "pre_order_search",
        args: "head: BinaryNode<number>",
        return: "number[]",
    },

    BTInOrder: {
        type: "fn",
        fn: "in_order_search",
        args: "head: BinaryNode<number>",
        return: "number[]",
    },

    BTPostOrder: {
        type: "fn",
        fn: "post_order_search",
        args: "head: BinaryNode<number>",
        return: "number[]",
    },

    BTBFS: {
        type: "fn",
        fn: "bfs",
        args: "head: BinaryNode<number>, needle: number",
        return: "boolean",
    },

    CompareBinaryTrees: {
        type: "fn",
        fn: "compare",
        args: "a: BinaryNode<number> | null, b: BinaryNode<number> | null",
        return: "boolean",
    },

    DFSOnBST: {
        type: "fn",
        fn: "dfs",
        args: "head: BinaryNode<number>, needle: number",
        return: "boolean",
    },

    DFSGraphList: {
        type: "fn",
        fn: "dfs",
        args: "graph: WeightedAdjacencyList, source: number, needle: number",
        return: "number[] | null",
    },

    BFSGraphList: {
        type: "fn",
        fn: "bfs",
        args: "graph: WeightedAdjacencyList, source: number, needle: number",
        return: "number[] | null",
    },

    BFSGraphMatrix: {
        type: "fn",
        fn: "bfs",
        args: "graph: WeightedAdjacencyMatrix, source: number, needle: number",
        return: "number[] | null",
    },

    CoinChange: {
        type: "fn",
        fn: "coin_change",
        args: "amount: number, coins: number[]",
        "return": "number",
    },

    DailyTemperatures: {
        type: "fn",
        fn: "daily_temperatures",
        args: "temperatures: number[]",
        "return": "number[]",
    },

    FenwickTree: {
        type: "class",
        methods: [{
            name: "add",
            args: "idx: number, delta: number",
            return: "void",
        }, {
            name: "sum",
            args: "idx: number",
            return: "number",
        }],
        properties: [{
            name: "length",
            type: "number",
            scope: "public",
        }],
    },

    FindMinRotatedSorted: {
        type: "fn",
        fn: "find_min_rotated",
        args: "nums: number[]",
        "return": "number",
    },

    HasCycle: {
        type: "fn",
        fn: "has_cycle",
        args: "head: ListNode<number> | null",
        "return": "boolean",
    },

    HashSet: {
        type: "class",
        methods: [{
            name: "add",
            args: "key: number",
            return: "void",
        }, {
            name: "remove",
            args: "key: number",
            return: "void",
        }, {
            name: "contains",
            args: "key: number",
            return: "boolean",
        }],
        properties: [{
            name: "length",
            type: "number",
            scope: "public",
        }],
    },

    Knapsack: {
        type: "fn",
        fn: "knapsack",
        args: "capacity: number, weights: number[], values: number[]",
        "return": "number",
    },

    KthLargest: {
        type: "fn",
        fn: "kth_largest",
        args: "nums: number[], k: number",
        "return": "number",
    },

    LongestCommonSubsequence: {
        type: "fn",
        fn: "longest_common_subsequence",
        args: "a: string, b: string",
        "return": "number",
    },

    MedianFinder: {
        type: "class",
        methods: [{
            name: "insert",
            args: "value: number",
            return: "void",
        }, {
            name: "getMedian",
            args: "",
            return: "number",
        }],
        properties: [{
            name: "length",
            type: "number",
            scope: "public",
        }],
    },

    MergeRanges: {
        type: "fn",
        fn: "merge_ranges",
        args: "intervals: [number, number][]",
        "return": "[number, number][]",
    },

    SegmentTree: {
        type: "class",
        methods: [{
            name: "update",
            args: "idx: number, value: number",
            return: "void",
        }, {
            name: "query",
            args: "left: number, right: number",
            return: "number",
        }],
        properties: [{
            name: "length",
            type: "number",
            scope: "public",
        }],
    },

    SlidingWindowMax: {
        type: "fn",
        fn: "sliding_window_max",
        args: "nums: number[], k: number",
        "return": "number[]",
    },

    Subsets: {
        type: "fn",
        fn: "subsets",
        args: "nums: number[]",
        "return": "number[][]",
    },

    TopologicalSort: {
        type: "fn",
        fn: "topological_sort",
        args: "numNodes: number, edges: [number, number][]",
        "return": "number[]",
    },

    TwoSumSorted: {
        type: "fn",
        fn: "two_sum_sorted",
        args: "nums: number[], target: number",
        "return": "[number, number]",
    },

    UnionFind: {
        type: "class",
        methods: [{
            name: "find",
            args: "p: number",
            return: "number",
        }, {
            name: "union",
            args: "p: number, q: number",
            return: "void",
        }, {
            name: "connected",
            args: "p: number, q: number",
            return: "boolean",
        }],
        properties: [{
            name: "length",
            type: "number",
            scope: "public",
        }],
    },

    InvertTree: {
        type: "fn",
        fn: "invert_tree",
        args: "root: BinaryNode<number> | null",
        "return": "BinaryNode<number> | null",
    },

    KadanesAlgorithm: {
        type: "fn",
        fn: "max_subarray",
        args: "nums: number[]",
        "return": "number",
    },

    KMP: {
        type: "fn",
        fn: "kmp_search",
        args: "text: string, pattern: string",
        "return": "number",
    },
};

