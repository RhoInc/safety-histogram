export default function calculateScottBinWidth(obj) {
    //https://en.wikipedia.org/wiki/Histogram#Scott's_normal_reference_rule
    const range = this.config.x.domain[1] - this.config.x.domain[0];
    obj.stats.ScottBinWidth = (3.5 * obj.stats.std) / Math.pow(obj.stats.n, 1.0 / 3.0);
    console.log(obj.stats.ScottBinWidth);
    obj.stats.ScottBins =
        obj.stats.ScottBinWidth > 0 ? Math.max(Math.ceil(range / obj.stats.ScottBinWidth), 5) : NaN;
    console.log(obj.stats.ScottBins);
}
