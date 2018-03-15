import { extent } from 'd3';

export default function defineMeasureData() {
    this.measure_data = this.raw_data
        .filter(d => d[this.config.measure_col] === this.currentMeasure);
    this.measure_domain = extent(
        this.measure_data,
        d => +d[this.config.value_col]
    );
}
