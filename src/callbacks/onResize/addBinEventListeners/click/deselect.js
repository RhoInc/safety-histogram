export default function deselect(element, d) {
    delete this.highlightedBin;
    delete this.highlighteD;
    this.listing.draw([]);
    this.listing.wrap.style('display', 'none');
    this.svg.selectAll('.bar').attr('fill-opacity', 0.75);

    this.footnotes.barClick
        .style({
            cursor: 'normal',
            'text-decoration': 'none'
        })
        .text('Click a bar for details.');
    this.footnotes.barDetails.text(
        `${d.values.raw.length} records with ` +
            `${this.measure.current} values from ` +
            `${this.config.x.d3format1(d.rangeLow)} to ${this.config.x.d3format1(d.rangeHigh)}`
    );
}
