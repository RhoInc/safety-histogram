import { extent, nest, format } from 'd3';

export default function drawNormalRanges() {
    this.svg
        .selectAll('.normal-range')
        .remove();

    if (this.config.displayNormalRange) {
        //Capture distinct normal ranges in filtered data.
        const normalRanges = nest()
            .key(d => `${d[this.config.normal_col_low]},${d[this.config.normal_col_high]}`) // set key to comma-delimited normal range
            .rollup(d => d.length)
            .entries(this.filtered_data)
            .map(d => {
                d.keySplit = d.key.split(',');

                //lower
                d.lower = +d.keySplit[0];
                d.x1 = d.lower >= this.x_dom[0]
                    ? this.x(d.lower)
                    : 0;

                //upper
                d.upper = +d.keySplit[1];
                d.x2 = d.upper <= this.x_dom[1]
                    ? this.x(d.upper)
                    : this.plot_width;

                //width
                d.width = d.x2 - d.x1;

                //tooltip
                d.tooltip = (
                    `Normal range: ${
                        d.lower
                    } - ${
                        d.upper
                    } (${
                        format('%')(d.values / this.filtered_data.length)
                    } of records)`
                );

                //plot if:
                //  - at least one of the limits of normal fall within the current x-domain
                //  - the lower limit is less than the current x-domain and the upper limit is greater than current the x-domain
                d.plot = (
                    (this.x_dom[0] <= d.lower && d.lower <= this.x_dom[1]) ||
                    (this.x_dom[0] <= d.upper && d.upper <= this.x_dom[1]) ||
                    (this.x_dom[0] >= d.lower && d.upper >= this.x_dom[1])
                );

                return d;
            })
            .filter(d => d.plot)
            .sort((a,b) => (
                a.lower <= b.lower && a.upper >= b.upper ?  1 : // lesser minimum and greater maximum
                a.lower >= b.lower && a.upper <= b.upper ? -1 : // greater minimum and lesser maximum
                a.lower <= b.lower && a.upper <= b.upper ?  1 : // lesser minimum and lesser maximum
                a.lower >= b.lower && a.upper >= b.upper ? -1 : // greater minimum and greater maximum
                                                            1
            )); // sort normal ranges so larger normal ranges plot beneath smaller normal ranges

        //Add rects to chart for each normal range.
        const rects = this.svg
            .selectAll('rect.normal-range')
                .data(normalRanges)
                .enter()
            .insert('rect', ':first-child')
            .classed('normal-range', true)
            .attr({
                x: d => d.x1,
                y: 0,
                width: d => d.width,
                height: this.plot_height,
            })
            .style({
                stroke: 'black',
                fill: 'black',
                'stroke-opacity': d => (d.values / this.filtered_data.length) * 0.75,
                'fill-opacity': d => (d.values / this.filtered_data.length) * 0.5
            }); // opacity as a function of fraction of records with the given normal range

        //Add tooltips to each normal range rect.
        const titles = rects
            .append('title')
            .text(d => d.tooltip);
    }
}
