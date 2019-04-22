export default function resetRenderer() {
    //Reset listing.
    this.listing.draw([]);
    this.listing.wrap.selectAll('*').style('display', 'none');

    //Reset footnote.
    this.wrap
        .select('.annote')
        .classed('tableTitle', false)
        .text('Click a bar for details.');

    //Reset bar highlighting.
    delete this.highlightedBin;
    delete this.highlighteD;
    this.svg.selectAll('.bar').attr('opacity', 1);
}
