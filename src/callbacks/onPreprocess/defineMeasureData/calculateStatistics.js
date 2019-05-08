import { set, extent, quantile, layout } from 'd3';
import calculateFDBins from './calculateStatistics/calculateFDBins';
import calculateSSBins from './calculateStatistics/calculateSSBins';

export default function calculateStatistics(obj) {
    //Define array of all and unique results.
    obj.results = obj.data.map(d => +d[this.config.value_col]).sort((a, b) => a - b);
    obj.uniqueResults = set(obj.results).values();

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

    //Calculate bin width with Freedman-Diaconis algorithm.
    calculateFDBins(obj);
    obj.stats.nBins =
        obj.stats.FDBins < obj.stats.nUnique ? obj.stats.FDBins : obj.stats.nUnique;

    //Calculate bin width with Shimazaki-Shinomoto algorithm.
    //calculateSSBins(obj);
    //obj.stats.nBins =
    //    obj.stats.SSBins < obj.stats.nUnique ? obj.stats.SSBins : obj.stats.nUnique;

    //Calculate bin width.
    obj.stats.binWidth = obj.stats.range / obj.stats.nBins;
    obj.stats.bins = layout.histogram().bins(obj.stats.nBins)(obj.results);
}
