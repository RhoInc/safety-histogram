export default function drawZeroRangeBar() {
    if (this.current_data.length === 1) {
        this.svg
            .selectAll('g.bar-group rect')
            .transition()
            .delay(250) // wait for initial marks to transition
            .attr({
                x: d => (d.values.x !== 0 ? this.x(d.values.x * 0.999) : this.x(-0.1)),
                width: d =>
                    d.values.x !== 0
                        ? this.x(d.values.x * 1.001) - this.x(d.values.x * 0.999)
                        : this.x(0.1) - this.x(-0.1)
            });
    }
}
