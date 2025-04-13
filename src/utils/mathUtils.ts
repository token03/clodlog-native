const round = (value, precision = 3) => parseFloat(value.toFixed(precision));

const clamp = (value, min = 0, max = 100) => {
    return Math.min(Math.max(value, min), max);
};

const adjust = (value, fromMin, fromMax, toMin, toMax) => {
    return round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
};

export { round, clamp, adjust };
