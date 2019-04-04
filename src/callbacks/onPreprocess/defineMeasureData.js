import { extent, quantile } from 'd3';

export default function defineMeasureData() {
    //Filter on selected measure.
    this.measure.data = this.initial_data.filter(d => d.sh_measure === this.measure.current);

    //Define array of all and unique results.
    this.measure.results = this.measure.data
        .map(d => +d[this.config.value_col])
        .sort((a, b) => a - b);
    this.measure.uniqueResults = d3.set(this.measure.results).values();

    //Calculate statistics.
    this.measure.domain = extent(this.measure.results);
    this.measure.stats = {
        n: this.measure.results.length,
        nUnique: this.measure.uniqueResults.length,
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

    //Calculate bin width and number of bins.
    this.measure.stats.binWidth =
        (2 * this.measure.stats.iqr) / Math.pow(this.measure.stats.n, 1.0 / 3.0); // https://en.wikipedia.org/wiki/Freedman%E2%80%93Diaconis_rule
    this.measure.stats.calculatedBins = this.measure.stats.binWidth > 0
        ? Math.ceil(this.measure.stats.range / this.measure.stats.binWidth)
        : NaN;
    this.measure.stats.nBins = this.measure.stats.calculatedBins < this.measure.stats.nUnique
        ? this.measure.stats.calculatedBins
        : this.measure.stats.nUnique;
    this.config.x.bin = this.measure.stats.nBins;

    //Set chart data to measure data.
    this.raw_data = this.measure.data.slice();
}
