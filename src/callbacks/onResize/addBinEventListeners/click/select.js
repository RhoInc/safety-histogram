import { select as d3select } from 'd3';
import resetRenderer from '../../../onDraw/resetRenderer';

export default function select(element, d) {
    //Reduce bin opacity and highlight selected bin.
    this.svg
        .selectAll('.bar-group')
        .selectAll('.bar')
        .attr('fill-opacity', 0.5);
    d3select(element)
        .select('.bar')
        .attr('fill-opacity', 1);

    //Update bar click footnote
    this.footnotes.barClick
        .style({
            cursor: 'pointer',
            'text-decoration': 'underline'
        })
        .text(`Click here to remove details and clear highlighting.`)
        .on('click', () => {
            resetRenderer.call(this);
        });

    //Update bar details footnotes.
    this.footnotes.barDetails.text(
        `Table displays ${d.values.raw.length} records with ` +
            `${this.measure.current} values from ` +
            `${this.config.x.d3format1(d.rangeLow)} to ${this.config.x.d3format1(d.rangeHigh)}.`
    );

    //Draw listing.
    this.listing.draw(d.values.raw);
    this.listing.wrap.selectAll('*').style('display', null);
}
