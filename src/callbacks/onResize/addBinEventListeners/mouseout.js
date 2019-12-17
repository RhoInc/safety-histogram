import { select } from 'd3';

export default function mouseout(element, d) {
    const context = this;
    const safetyHistogram = this.sh ? this.sh : this;

    // Update footnote.
    safetyHistogram.footnotes.barDetails.html(
        safetyHistogram.highlightedBin
            ? `Table displays ${safetyHistogram.highlighteD.footnote}.`
            : '<br>'
    );

    // Remove bar highlight.
    const selection = select(element);
    selection.selectAll('.bar').attr('stroke', this.colorScale());

    // Remove highlight from corresponding bar in small multiples.
    if (this.config.draw_multiples) {
        const otherCharts = this.multiples
            ? this.multiples.multiples
            : this.parent.multiples
                  .filter(multiple => multiple.filters[0].val !== this.filters[0].val)
                  .concat(safetyHistogram);
        otherCharts.forEach(chart => {
            chart.marks[0].groups.each(function(di) {
                if (di.key === d.key)
                    select(this)
                        .selectAll('.bar')
                        .attr('stroke', context.colorScale());
            });
        });
    }
}
