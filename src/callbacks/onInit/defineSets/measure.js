import { set } from 'd3';

export default function measure() {
    this.measures = set(this.initial_data.map(d => d[this.config.measure_col]))
        .values()
        .sort();
    this.sh_measures = set(this.initial_data.map(d => d.sh_measure))
        .values()
        .sort();
}
