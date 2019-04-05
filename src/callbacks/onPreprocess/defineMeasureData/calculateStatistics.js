import { extent, quantile } from 'd3';

export default function calculateStatistics(obj) {
    //Define array of all and unique results.
    obj.results = obj.data.map(d => +d[this.config.value_col]).sort((a, b) => a - b);
    obj.uniqueResults = d3.set(obj.results).values();

    //Calculate statistics.
    obj.domain = extent(obj.results);
    obj.stats = {
        n: obj.results.length,
        nUnique: obj.uniqueResults.length,
        min: obj.domain[0],
        q25: quantile(obj.results, 0.25),
        median: quantile(obj.results, 0.5),
        q75: quantile(obj.results, 0.75),
        max: obj.domain[1],
        range: obj.domain[1] - obj.domain[0]
    };
    obj.stats.log10range = obj.stats.range > 0 ? Math.log10(obj.stats.range) : NaN;
    obj.stats.iqr = obj.stats.q75 - obj.stats.q25;

    //Calculate bin width and number of bins.
    obj.stats.calculatedBinWidth = (2 * obj.stats.iqr) / Math.pow(obj.stats.n, 1.0 / 3.0); // https://en.wikipedia.org/wiki/Freedman%E2%80%93Diaconis_rule
    obj.stats.calculatedBins =
        obj.stats.calculatedBinWidth > 0
            ? Math.ceil(obj.stats.range / obj.stats.calculatedBinWidth)
            : NaN;
    obj.stats.nBins =
        obj.stats.calculatedBins < obj.stats.nUnique ? obj.stats.calculatedBins : obj.stats.nUnique;
    obj.stats.binWidth = obj.stats.range / obj.nBins;
}
