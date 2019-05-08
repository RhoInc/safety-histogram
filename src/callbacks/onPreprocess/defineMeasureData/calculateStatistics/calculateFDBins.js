export default function calculateFDBins(obj) {
    //https://en.wikipedia.org/wiki/Histogram#Freedman%E2%80%93Diaconis'_choice
    obj.stats.FDBinWidth = (2 * obj.stats.iqr) / Math.pow(obj.stats.n, 1.0 / 3.0);
    obj.stats.FDBins =
        obj.stats.FDBinWidth > 0
            ? Math.ceil(obj.stats.range / obj.stats.FDBinWidth)
            : NaN;
}
