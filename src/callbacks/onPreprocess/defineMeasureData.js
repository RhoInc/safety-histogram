import { extent, quantile } from 'd3';

export default function defineMeasureData() {
    this.measure.data = this.initial_data.filter(d => d.sh_measure === this.measure.current);
    this.measure.unit =
        this.config.unit_col &&
        this.measure.data.length &&
        this.measure.data[0].hasOwnProperty(this.config.unit_col)
            ? this.measure.data[0][this.config.unit_col]
            : null;
    this.measure.results = this.measure.data
        .map(d => +d[this.config.value_col])
        .sort((a, b) => a - b);
    this.measure.uniqueResults = d3.set(this.measure.results).values();
    this.measure.nUniqueResults = this.measure.uniqueResults.length;
    this.measure.domain = extent(this.measure.results);
    this.measure.stats = {
        n: this.measure.results.length,
        min: this.measure.domain[0],
        q25: quantile(this.measure.results, 0.25),
        median: quantile(this.measure.results, 0.5),
        q75: quantile(this.measure.results, 0.75),
        max: this.measure.domain[1],
        range: this.measure.domain[1] - this.measure.domain[0]
    };
    this.measure.stats.log10range =
        this.measure.stats.range > 0 ? Math.log10(this.measure.stats.range) : NaN;
    this.measure.stats.iqr = this.measure.stats.q75 - this.measure.stats.q25;
    this.measure.stats.binWidth =
        (2 * this.measure.stats.iqr) / Math.pow(this.measure.stats.n, 1.0 / 3.0);
    this.measure.stats.bins =
        this.measure.stats.binWidth > 0
            ? this.measure.stats.range / this.measure.stats.binWidth
            : this.measure.nUniqueResults;
    console.table(this.measure.stats);
    this.config.x.bin = this.measure.stats.bins;
    this.raw_data = this.measure.data.slice();
}
