export default function defineBinBoundaries() {
    const obj = this.measure[this.measure.domain_state];
    this.measure.binBoundaries = obj.stats.binBoundaries.map((d, i) => {
        const value = obj.domain[0] + obj.stats.binWidth * i;
        return {
            value: value,
            value1: this.config.x.d3format(value),
            value2: this.config.x.d3format1(value)
        };
    });
}
