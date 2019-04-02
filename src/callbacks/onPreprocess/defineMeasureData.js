import { extent } from 'd3';

export default function defineMeasureData() {
    this.measure.data = this.initial_data.filter(d => d.sh_measure === this.measure.current);
    this.measure.unit =
        this.config.unit_col && this.measure.data[0].hasOwnProperty(this.config.unit_col)
            ? this.measure.data[0][this.config.unit_col]
            : null;
    this.measure.results = this.measure.data
        .map(d => +d[this.config.value_col])
        .sort((a, b) => a - b);
    this.measure.domain = extent(this.measure.results);
    this.measure.range = this.measure.domain[1] - this.measure.domain[0];
    this.measure.log10range = Math.log10(this.measure.range);
    this.raw_data = this.measure.data.slice();
}
