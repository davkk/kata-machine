import SegmentTree from "@code/SegmentTree";

test("segment tree", function () {
    const st = new SegmentTree([1, 3, 5, 7, 9, 11]);
    expect(st.length).toEqual(6);

    expect(st.query(0, 2)).toEqual(9);
    expect(st.query(1, 3)).toEqual(15);
    expect(st.query(0, 5)).toEqual(36);

    st.update(1, 10);
    expect(st.query(0, 2)).toEqual(16);
    expect(st.query(1, 3)).toEqual(22);
});
