import daily_temperatures from "@code/DailyTemperatures";

test("daily temperatures", function () {
    expect(daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
    expect(daily_temperatures([30, 40, 50, 60])).toEqual([1, 1, 1, 0]);
    expect(daily_temperatures([30, 60, 90])).toEqual([1, 1, 0]);
    expect(daily_temperatures([90, 80, 70])).toEqual([0, 0, 0]);
});
