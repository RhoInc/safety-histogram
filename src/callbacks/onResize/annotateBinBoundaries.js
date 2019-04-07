export default function annotateBinBoundaries() {
    //Remove bin boundaries.
    this.svg.selectAll('text.bin-boundary').remove();

    //Define set of bin boundaries.
    const binBoundaries = d3
        .set(d3.merge(this.current_data.map(d => [d.rangeLow, d.rangeHigh])))
        .values()
        .map(value => {
            return {
                value: +value,
                value1: this.config.x.d3format(value),
                value2: this.config.x.d3format1(value)
            };
        })
        .sort((a, b) => a.value - b.value);

    //Check for repeats of values formatted with lower precision.
    const repeats = d3
        .nest()
        .key(d => d.value1)
        .rollup(d => d.length)
        .entries(binBoundaries)
        .some(d => d.values > 1);

    //Annotate bin boundaries.
    this.svg
        .selectAll('text.bin-boundary')
        .data(binBoundaries)
        .enter()
        .append('text')
        .classed('bin-boundary', true)
        .attr({
            x: d => this.x(d.value),
            y: this.y(0),
            dy: '16px',
            'text-anchor': 'middle'
        })
        .text(d => (repeats ? d.value2 : d.value1));
}
