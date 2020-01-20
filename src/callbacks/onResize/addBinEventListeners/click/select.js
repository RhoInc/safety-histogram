import { select as d3select } from 'd3';
import resetRenderer from '../../../onDraw/resetRenderer';

export default function select(element, d) {
    const safetyHistogram = this.sh ? this.sh : this;

    // Reduce bin opacity of all bars in main chart.
    safetyHistogram.svg
        .selectAll('.bar-group')
        .selectAll('.bar')
        .attr('fill-opacity', 0.5);

    // Reduce bin opacity of all bars in small multiples.
    if (
        safetyHistogram.config.draw_multiples &&
        safetyHistogram.multiples &&
        safetyHistogram.multiples.multiples
    ) {
        safetyHistogram.multiples.multiples.forEach(multiple => {
            multiple.svg
                .selectAll('.bar-group')
                .selectAll('.bar')
                .attr('fill-opacity', 0.5);
        });
    }

    // Highlight selected bar.
    d3select(element)
        .select('.bar')
        .attr('fill-opacity', 1);

    // Update bar click footnote.
    safetyHistogram.footnotes.barClick
        .style({
            cursor: 'pointer',
            'text-decoration': 'underline'
        })
        .text(`Click here to remove details and clear highlighting.`)
        .on('click', () => {
            resetRenderer.call(safetyHistogram);
        });

    // Update bar details footnote.
    safetyHistogram.footnotes.barDetails.html(`Table displays ${d.footnote}.`);

    // Draw listing.
    safetyHistogram.listing.draw(d.values.raw);
    safetyHistogram.listing.wrap.style('display', 'inline-block');
}
