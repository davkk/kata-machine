const MIN_INTERVAL = 1;

function sm2(score, prev) {
    const ef = prev ? prev.easiness : 2.5;
    const interval = prev ? prev.interval : 0;
    let new_ef, new_interval;
    if (score >= 3) {
        if (interval === 0) new_interval = score - 2;
        else if (interval === 1) new_interval = 6;
        else new_interval = Math.round(interval * ef);
        new_ef = Math.max(1.3, ef + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02)));
    } else {
        new_interval = 1;
        new_ef = Math.max(1.3, ef);
    }
    new_interval = Math.max(MIN_INTERVAL, new_interval);
    const next = new Date();
    next.setDate(next.getDate() + new_interval);
    return {
        interval: new_interval,
        easiness: Math.round(new_ef * 100) / 100,
        next_review: next.toISOString().split("T")[0],
    };
}

module.exports = { sm2, MIN_INTERVAL };
