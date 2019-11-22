import { extent, nest, format } from 'd3';

export default function drawNormalRanges() {
    this.controls.wrap.select('.normal-range-list').remove();
    this.svg.select('.normal-ranges').remove();

    if (this.config.display_normal_range && this.filtered_data.length > 0) {
        // Capture distinct normal ranges in filtered data.
        const normalRanges = nest()
            .key(d => `${d[this.config.normal_col_low]},${d[this.config.normal_col_high]}`) // set key to comma-delimited normal range
            .rollup(d => d.length)
            .entries(this.filtered_data)
            .map(d => {
                d.keySplit = d.key.split(',');

                // lower
                d.lower = +d.keySplit[0];
                d.x1 = d.lower >= this.x_dom[0] ? this.x(d.lower) : 0;

                // upper
                d.upper = +d.keySplit[1];
                d.x2 = d.upper <= this.x_dom[1] ? this.x(d.upper) : this.plot_width;

                // width
                d.width = d.x2 - d.x1;

                // tooltip
                d.rate = d.values / this.filtered_data.length;
                d.tooltip =
                    d.values < this.filtered_data.length
                        ? `${d.lower} - ${d.upper} (${format('%')(d.rate)} of records)`
                        : `${d.lower} - ${d.upper}`;

                // plot if:
                //  - at least one of the limits of normal fall within the current x-domain
                //  - the lower limit is less than the current x-domain and the upper limit is greater than current the x-domain
                d.plot =
                    (this.x_dom[0] <= d.lower && d.lower <= this.x_dom[1]) ||
                    (this.x_dom[0] <= d.upper && d.upper <= this.x_dom[1]) ||
                    (this.x_dom[0] >= d.lower && d.upper >= this.x_dom[1]);

                return d;
            })
            .sort((a, b) => {
                const diff_lower = a.lower - b.lower;
                const diff_upper = a.upper - b.upper;
                return diff_lower ? diff_lower : diff_upper ? diff_upper : 0;
            }); // sort normal ranges so larger normal ranges plot beneath smaller normal ranges

        // Add tooltip to Normal Range control that lists normal ranges.
        this.controls.wrap
            .selectAll('#normal-range .wc-control-label')
            .append('span')
            .classed('normal-range-list', true)
            .html(' &#9432')
            .attr(
                'title',
                normalRanges.length > 1
                    ? `${this.measure.current} normal ranges:\n${normalRanges
                          .map(normalRange => normalRange.tooltip)
                          .join('\n')}`
                    : `${this.measure.current} normal range: ${normalRanges[0].tooltip}`
            )
            .style('cursor', 'default');

        // Add groups in which to draw normal range rectangles and annotations.
        const group = this.svg.insert('g', '.bar-supergroup').classed('normal-ranges', true);
        const groups = group
            .selectAll('g.normal-range')
            .data(normalRanges.filter(d => d.plot))
            .enter()
            .append('g')
            .classed('normal-range', true);

        // Draw normal range rectangles.
        const rectangles = groups
            .append('rect')
            .classed('normal-range__rect', true)
            .attr({
                x: d => d.x1,
                y: 0,
                width: d => d.width,
                height: this.plot_height,
                stroke: '#c26683',
                fill: '#c26683',
                'stroke-opacity': d => (d.values / this.filtered_data.length) * 0.5,
                'fill-opacity': d => (d.values / this.filtered_data.length) * 0.25
            }); // opacity as a function of fraction of records with the given normal range
    }
}
