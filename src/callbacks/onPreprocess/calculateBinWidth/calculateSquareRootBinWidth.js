export default function calculateSquareRootBinWidth(obj) {
    // https://en.wikipedia.org/wiki/Histogram#Square-root_choice
    const range = this.config.x.domain[1] - this.config.x.domain[0];
    obj.stats.SquareRootBins = Math.ceil(Math.sqrt(obj.stats.n));
    obj.stats.SquareRootBinWidth = range / obj.stats.SquareRootBins;
}
