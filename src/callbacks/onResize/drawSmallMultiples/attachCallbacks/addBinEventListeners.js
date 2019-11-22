import { select } from 'd3';

export default function addBinEventListeners() {
    const context = this;

    const barGroups = this.svg.selectAll('.bar-group');

    barGroups
        .on('mouseover', function(d) {
            // Update bar details footnote.
            context.sh.footnotes.barDetails.html(`Bar encompasses ${d.footnote}.`);

            // Highlight bar.
            const selection = select(this);
            if (!/trident/i.test(navigator.userAgent)) selection.moveToFront();
            selection.selectAll('.bar').attr('stroke', 'black');

            // Highlight corresponding bar in small multiples.
            context.parent.multiples
                .filter(multiple => multiple.filters[0].val !== context.filters[0].val)
                .concat(context.sh)
                .forEach(multiple => {
                    multiple.marks[0].groups.each(function(di) {
                        if (di.key === d.key) {
                            const selection = d3.select(this);
                            if (!/trident/i.test(navigator.userAgent)) selection.moveToFront();
                            selection.selectAll('.bar').attr('stroke', 'black');
                        }
                    });
                });
        })
        .on('mouseout', function(d) {
            // Update footnote.
            context.sh.footnotes.barDetails.html(
                context.highlightedBin ? `Table displays ${context.highlighteD.footnote}.` : '<br>'
            );

            // Remove bar highlight.
            const selection = select(this);
            selection.selectAll('.bar').attr('stroke', context.colorScale());

            // Remove highlight from corresponding bar in small multiples.
            context.parent.multiples
                .filter(multiple => multiple.filters[0].val !== context.filters[0].val)
                .concat(context.sh)
                .forEach(multiple => {
                    multiple.marks[0].groups.each(function(di) {
                        if (di.key === d.key)
                            select(this)
                                .selectAll('.bar')
                                .attr('stroke', context.colorScale());
                    });
                });
        })
        .on('click', function(d) {});
}
