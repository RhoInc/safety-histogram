export default function increasePrecision() {
    const ticks = this.x.ticks()
        .map(d => this.config.x.d3format(d));
    if (d3.nest().key(d => d).rollup(d => d.length).entries(ticks).some(d => d.values > 1))
        this.config.x.format = this.config.x.format1;
}
