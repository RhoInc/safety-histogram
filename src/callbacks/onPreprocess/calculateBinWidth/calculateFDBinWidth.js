export default function calculateFDBinWidth(obj) {
    // https:// en.wikipedia.org/wiki/Histogram#Freedman%E2%80%93Diaconis'_choice
    const range = this.config.x.domain[1] - this.config.x.domain[0];
    obj.stats.FDBinWidth = (2 * obj.stats.iqr) / Math.pow(obj.stats.n, 1.0 / 3.0);
    obj.stats.FDBins =
        obj.stats.FDBinWidth > 0 ? Math.max(Math.ceil(range / obj.stats.FDBinWidth), 5) : NaN;
}
