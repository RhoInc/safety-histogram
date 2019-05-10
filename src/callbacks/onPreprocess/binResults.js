import { set, merge } from 'd3';

export default function binResults() {
    //Modify bin arrays.
    this.measure[this.measure.domain_state].stats.bins.forEach(bin => {
        bin.lower = bin.x;
        bin.lower_fmt = this.config.x.d3format(bin.lower);
        bin.lower_fmt1 = this.config.x.d3format1(bin.lower);
        bin.upper = bin.x + bin.dx;
        bin.upper_fmt = this.config.x.d3format(bin.upper);
        bin.upper_fmt1 = this.config.x.d3format1(bin.upper);
        bin.label = `${bin.lower_fmt}-${bin.upper_fmt}`;
    });

    //Define bin boundaries to plot on the x-axis.
    this.measure.binBoundaries = set(
        merge(this.measure[this.measure.domain_state].stats.bins.map(d => [d.lower, d.upper]))
    )
        .values()
        .map(value => {
            return {
                value: +value,
                value1: this.config.x.d3format(value),
                value2: this.config.x.d3format1(value)
            };
        })
        .sort((a, b) => a.value - b.value);
}
