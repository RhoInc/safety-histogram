import { set } from 'd3';

export default function participant() {
    this.participants = set(this.initial_data.map(d => d[this.config.id_col]))
        .values()
        .sort();
}
