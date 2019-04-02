export default function handleSingleObservation() {
    this.svg.select('#custom-bin').remove();
    if (this.current_data.length === 1) {
        const datum = this.current_data[0];
        this.svg
            .append('g')
            .classed('bar-group', true)
            .attr('id', 'custom-bin')
            .append('rect')
            .data([datum])
            .classed('wc-data-mark bar', true)
            .attr({
                y: 0,
                height: this.plot_height,
                'shape-rendering': 'crispEdges',
                stroke: 'rgb(102,194,165)',
                fill: 'rgb(102,194,165)',
                'fill-opacity': '0.75',
                width: this.x(datum.values.x * 1.001) - this.x(datum.values.x * 0.999),
                x: this.x(datum.values.x * 0.999)
            });
    }
}
