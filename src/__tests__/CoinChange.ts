import coin_change from "@code/CoinChange";

test("coin change", function () {
    expect(coin_change(5, [1, 2, 5])).toEqual(1);
    expect(coin_change(3, [2])).toEqual(-1);
    expect(coin_change(0, [1, 2, 5])).toEqual(0);
    expect(coin_change(11, [1, 2, 5])).toEqual(3);
    expect(coin_change(100, [1, 10, 25])).toEqual(4);
});
