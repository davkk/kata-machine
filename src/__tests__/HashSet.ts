import HashSet from "@code/HashSet";

test("hash set", function () {
    const set = new HashSet();
    expect(set.length).toEqual(0);
    expect(set.contains(1)).toEqual(false);

    set.add(1);
    set.add(2);
    expect(set.contains(1)).toEqual(true);
    expect(set.contains(3)).toEqual(false);
    expect(set.length).toEqual(2);

    set.add(2);
    expect(set.length).toEqual(2);

    set.remove(2);
    expect(set.contains(2)).toEqual(false);
    expect(set.length).toEqual(1);

    set.remove(1);
    expect(set.contains(1)).toEqual(false);
    expect(set.length).toEqual(0);

    set.add(100);
    set.add(200);
    set.add(300);
    expect(set.length).toEqual(3);
});
