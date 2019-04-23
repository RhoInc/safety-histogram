export default function resetRenderer() {
    delete this.highlightedBin;
    delete this.highlighteD;

    //Reset bar highlighting.
    this.svg
        .selectAll('.bar-group')
        .classed('selected', false)
        .selectAll('.bar')
        .attr('fill-opacity', 0.75);

    //Reset footnotes.
    this.footnotes.barClick
        .style({
            'text-decoration': 'none',
            cursor: 'normal'
        })
        .text('Click a bar for details.');
    this.footnotes.barDetails.text('');

    //Reset listing.
    this.listing.draw([]);
    this.listing.wrap.selectAll('*').style('display', 'none');
}
