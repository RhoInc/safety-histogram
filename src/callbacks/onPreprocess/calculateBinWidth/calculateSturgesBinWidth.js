export default function calculateSturgesBinWidth(obj) {
    // https:// en.wikipedia.org/wiki/Histogram#Sturges'_formula
    const range = this.config.x.domain[1] - this.config.x.domain[0];
    obj.stats.SturgesBins = Math.ceil(Math.log2(obj.stats.n)) + 1;
    obj.stats.SturgesBinWidth = range / obj.stats.SturgesBins;
}
