export default function resetRenderer() {
    delete this.highlightedBin;
    delete this.highlighteD;

    // Remove bin boundaries.
    this.svg.select('g.bin-boundaries').remove();

    // Reset bar highlighting.
    this.svg
        .selectAll('.bar-group')
        .classed('selected', false)
        .selectAll('.bar')
        .attr('fill-opacity', 0.75);
    if (this.config.draw_multiples && this.multiples && this.multiples.multiples) {
        this.multiples.multiples.forEach(multiple => {
            multiple.svg
                .selectAll('.bar-group')
                .classed('selected', false)
                .selectAll('.bar')
                .attr('fill-opacity', 0.75);
        });
    }

    // Reset footnotes.
    this.footnotes.barClick
        .style({
            'text-decoration': 'none',
            cursor: 'normal'
        })
        .text('Click a bar for details.');
    this.footnotes.barDetails.html('<br>');

    // Reset listing.
    this.listing.draw([]);
    this.listing.wrap.style('display', 'none');
}
