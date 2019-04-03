export default function drawZeroRangeBar() {
    if (this.current_data.length === 1) {
        this.svg
            .selectAll('g.bar-group rect')
            .transition(250)
            .attr({
                x: d => this.x(d.values.x * 0.999),
                width: d => this.x(d.values.x * 1.001) - this.x(d.values.x * 0.999),
            });
    }
}
