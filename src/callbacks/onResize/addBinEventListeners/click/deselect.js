export default function deselect(element, d) {
    const safetyHistogram = this.sh ? this.sh : this;

    delete safetyHistogram.highlightedBin;
    delete safetyHistogram.highlighteD;

    safetyHistogram.listing.draw([]);
    safetyHistogram.listing.wrap.style('display', 'none');

    // Reset opacity of all bars in main chart.
    safetyHistogram.svg.selectAll('.bar').attr('fill-opacity', 0.75);

    // Reset opacity of all bars in small multiples.
    if (
        safetyHistogram.config.draw_multiples &&
        safetyHistogram.multiples &&
        safetyHistogram.multiples.multiples
    ) {
        safetyHistogram.multiples.multiples.forEach(multiple => {
            multiple.svg.selectAll('.bar').attr('fill-opacity', 0.75);
        });
    }

    safetyHistogram.footnotes.barClick
        .style({
            cursor: 'normal',
            'text-decoration': 'none'
        })
        .text('Click a bar for details.');

    safetyHistogram.footnotes.barDetails.html(`Bar encompases ${d.footnote}.`);
}
