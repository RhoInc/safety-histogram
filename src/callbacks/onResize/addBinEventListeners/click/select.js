import { select as d3select } from 'd3';

export default function select(element, d) {
    //Update bar click footnote
    this.footnotes.barClick
        .style({
            cursor: 'pointer',
            'text-decoration': 'underline'
        })
        .text(
            `Click here to remove details and clear highlighting.`
        )
        .on('click', () => {
            delete this.highlightedBin;
            delete this.highlighteD;
            this.listing.draw([]);
            this.listing.wrap.selectAll('*').style('display', 'none');
            this.svg.selectAll('.bar').attr('fill-opacity', 0.75);

            this.footnotes.barClick
                .style({
                    cursor: 'default',
                    'text-decoration': 'none'
                })
                .text('Click a bar for details.');
            this.footnotes.barDetails
                .text(
                    `${d.values.raw.length} records with ` +
                        `${this.measure.current} values from ` +
                        `${this.config.x.d3format1(d.rangeLow)} to ${this.config.x.d3format1(
                            d.rangeHigh
                        )}`
                );
        });

    //Update bar details footnotes.
    this.footnotes.barDetails
        .text(
            `Table displays ${d.values.raw.length} records with ` +
                `${this.measure.current} values from ` +
                `${this.config.x.d3format1(d.rangeLow)} to ${this.config.x.d3format1(
                    d.rangeHigh
                )}.`
        );

    //Draw listing.
    this.listing.draw(d.values.raw);
    this.listing.wrap.selectAll('*').style('display', null);

    //Reduce bin opacity and highlight selected bin.
    this.svg.selectAll('.bar-group')
        .selectAll('.bar')
        .attr('fill-opacity', 0.5);
    d3select(element)
        .select('.bar')
        .attr('fill-opacity', 1);
}
