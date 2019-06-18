import { select } from 'd3';

export default function addHoverBars() {
    const context = this;

    const bins = this.svg.selectAll('.bar-group').each(function(d) {
        const g = select(this);
        g.selectAll('.hover-bar').remove();

        //Drawing a path instead of a rect because Webcharts messes up the original rect on resize.
        const x = context.x(d.rangeLow);
        const y = 0;
        const width = context.x(d.rangeHigh) - context.x(d.rangeLow);
        const height = context.plot_height;
        const hoverBar = g
            .insert('path', ':first-child')
            .classed('hover-bar', true)
            .attr({
                d: `M ${x} ${y} V ${height} H ${x + width} V ${y}`,
                fill: 'black',
                'fill-opacity': 0,
                stroke: 'black',
                'stroke-opacity': 0
            });
        d.footnote =
            `${d.values.raw.length} records with ` +
            `${context.measure.current} values greater than or equal to ` +
            `${context.config.x.d3format1(d.rangeLow)} and less than ${
                d.rangeHigh < context.config.x.domain[1] ? '' : 'or equal to '
            }${context.config.x.d3format1(d.rangeHigh)}`;
    });
}
