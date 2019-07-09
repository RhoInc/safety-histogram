import { select } from 'd3';

export default function mouseout(element, d) {
    //Update footnote.
    this.footnotes.barDetails.html(
        this.highlightedBin ? `Table displays ${this.highlighteD.footnote}.` : ''
    );

    //Remove bar highlight.
    const selection = select(element);
    selection.selectAll('.bar').attr('stroke', this.colorScale());
}
