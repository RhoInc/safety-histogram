export default function addClearListing() {
    const chart = this;
    const footnote = this.wrap.select('.annote');
    this.wrap.selectAll('.overlay, .normalRange').on('click', function() {
        delete chart.highlightedBin;
        chart.listing.draw([]);
        chart.listing.wrap.selectAll('*').style('display', 'none');
        chart.svg.selectAll('.bar').attr('fill-opacity', 0.75);

        if (footnote.classed('tableTitle'))
            footnote.classed('tableTitle', false).text('Click a bar for details.');
    });
}
