import has_cycle from "@code/HasCycle";

test("has cycle", function () {
    const a: ListNode<number> = { value: 1 };
    const b: ListNode<number> = { value: 2 };
    const c: ListNode<number> = { value: 3 };
    a.next = b;
    b.next = c;
    expect(has_cycle(a)).toEqual(false);

    c.next = a;
    expect(has_cycle(a)).toEqual(true);

    expect(has_cycle(null)).toEqual(false);

    const single: ListNode<number> = { value: 1 };
    expect(has_cycle(single)).toEqual(false);
    single.next = single;
    expect(has_cycle(single)).toEqual(true);
});
