import MedianFinder from "@code/MedianFinder";

test("median finder", function () {
    const mf = new MedianFinder();
    mf.insert(5);
    expect(mf.getMedian()).toEqual(5);
    expect(mf.length).toEqual(1);

    mf.insert(10);
    expect(mf.getMedian()).toEqual(7.5);
    expect(mf.length).toEqual(2);

    mf.insert(2);
    expect(mf.getMedian()).toEqual(5);
    expect(mf.length).toEqual(3);

    mf.insert(1);
    expect(mf.getMedian()).toEqual(3.5);

    mf.insert(100);
    expect(mf.getMedian()).toEqual(5);
});
