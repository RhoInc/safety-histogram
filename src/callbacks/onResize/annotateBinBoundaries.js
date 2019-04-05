export default function annotateBinBoundaries() {
    const context = this;

    //Remove bin boundaries.
    this.svg.selectAll('.bin-boundary').remove();

    const binBoundaries = d3.set(
        d3.merge(this.current_data.map(d => [this.config.x.d3format(d.rangeLow), this.config.x.d3format(d.rangeHigh)]))
    ).values().sort((a,b) => +a - +b);
    this.svg
        .selectAll('text.bin-boundary')
            .data(binBoundaries)
            .enter()
        .append('text')
        .classed('bin-boundary', true)
        .attr({
            x: d => this.x(+d),
            y: this.y(0),
            dy: '16px',
            'text-anchor': 'middle'
        })
        .text(d => d);
    //console.log(this.current_data);
    //this.marks
    //    .find(mark => mark.type === 'bar')
    //    .groups
    //    .each(function(d) {
    //        //Annotate the lower boundary of the first bin.
    //        const lower = context.config.x.d3format(d.rangeLow);
    //        if (binBoundaries.indexOf(lower) < 0) {
    //            console.log(`lower ${lower}`);
    //            binBoundaries.push(lower);
    //        }
    //            const lowerBoundary = context.svg.append('text')
    //                .classed('bin-boundary bin-boundary--lower', true)
    //                .attr({
    //                    'x': context.x(d.rangeLow),
    //                    'y': context.y(0),
    //                    'dy': '16px',
    //                    'text-anchor': 'middle'
    //                })
    //                .text(lower);

    //        //Annotate the upper boundary of all bins.
    //        const upper = context.config.x.d3format(d.rangeHigh);
    //        if (binBoundaries.indexOf(upper) < 0) {
    //            console.log(`upper ${upper}`);
    //            binBoundaries.push(upper);
    //        }
    //            const upperBoundary = context.svg.append('text')
    //                .classed('bin-boundary bin-boundary--upper', true)
    //                .attr({
    //                    'x': context.x(d.rangeHigh),
    //                    'y': context.y(0),
    //                    'dy': '16px',
    //                    'text-anchor': 'middle'
    //                })
    //                .text(upper);
    //    });
}
