export default function calculateRiceBinWidth(obj) {
    // https:// en.wikipedia.org/wiki/Histogram#Rice_Rule
    const range = this.config.x.domain[1] - this.config.x.domain[0];
    obj.stats.RiceBins = Math.ceil(2 * Math.pow(obj.stats.n, 1.0 / 3.0));
    obj.stats.RiceBinWidth = range / obj.stats.RiceBins;
}
