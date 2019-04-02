import { select } from 'd3';

export default function mouseover(element, d) {
    //Update footnote.
    this.footnotes.barDetails.text(
        `${d.values.raw.length} records with ` +
            `${this.measure.current} values from ` +
            `${this.config.x.d3format1(d.rangeLow)} to ${this.config.x.d3format1(
                d.rangeHigh
            )}`
    );

    //Highlight bar.
    const selection = select(element);
    selection.moveToFront();
    selection
        .selectAll('.bar')
        .attr('stroke', 'black');
}
