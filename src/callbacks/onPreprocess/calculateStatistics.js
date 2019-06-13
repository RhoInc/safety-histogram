import { quantile } from 'd3';

export default function calculateStatistics(obj) {
    ['raw', 'custom'].forEach(property => {
        const obj = this.measure[property];

        //Calculate statistics.
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
    });
}
