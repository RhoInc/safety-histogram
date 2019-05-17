export default function drawZeroRangeBar() {
    if (
        this.current_data.length === 1 &&
        this.current_data[0].rangeLow === this.current_data[0].rangeHigh &&
        this.measure.domain_state !== 'raw'
    ) {
        const width = this.plot_width / 25;
        this.svg
            .selectAll('g.bar-group rect')
            .transition()
            .delay(250) // wait for initial marks to transition
            .attr({
                x: d => this.x(d.values.x) - width / 2,
                width
            });
    }
}
