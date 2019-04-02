import { select } from 'd3';

export default function mouseout(element, d) {
    //Update footnote.
    this.footnotes.barDetails.text(
        this.highlightedBin
            ? `Table displays ${this.highlighteD.values.raw.length} records with ` +
                `${this.measure.current} values from ` +
                `${this.config.x.d3format1(this.highlighteD.rangeLow)} to ${this.config.x.d3format1(
                    this.highlighteD.rangeHigh
                )}.`
            : ''
    );

    //Remove bar highlight.
    const selection = select(element);
    selection
        .selectAll('.bar')
        .attr('stroke', this.colorScale());
}
