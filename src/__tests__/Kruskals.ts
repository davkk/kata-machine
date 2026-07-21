import kruskals from "@code/Kruskals";
import { list1 } from "./graph";

test("KruskalsAlgorithm", function () {
    expect(kruskals(list1)).toEqual([
        [
            { to: 2, weight: 1 },
            { to: 1, weight: 3 },
        ],
        [
            { to: 4, weight: 1 },
            { to: 0, weight: 3 },
        ],
        [{ to: 0, weight: 1 }],
        [{ to: 6, weight: 1 }],
        [
            { to: 1, weight: 1 },
            { to: 5, weight: 2 },
        ],
        [
            { to: 6, weight: 1 },
            { to: 4, weight: 2 },
        ],
        [
            { to: 3, weight: 1 },
            { to: 5, weight: 1 },
        ],
    ]);
});
