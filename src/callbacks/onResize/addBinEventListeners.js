import { select, format } from 'd3';

export default function addBinEventListeners() {
    const chart = this;
    const config = this.config;
    const bins = this.svg.selectAll('.bar');
    const footnote = this.wrap.select('.annote');

    bins.style('cursor', 'pointer')
        .on('mouseover', d => {
            //Update footnote.
            if (footnote.classed('tableTitle') === false)
                footnote.text(
                    `${d.values.raw.length} records with ` +
                        `${chart.measure.current} values from ` +
                        `${chart.config.x.d3format1(d.rangeLow)} to ${chart.config.x.d3format1(
                            d.rangeHigh
                        )}`
                );
        })
        .on('mouseout', d => {
            //Update footnote.
            if (footnote.classed('tableTitle') === false) footnote.text('Click a bar for details.');
        })
        .on('click', function(d) {
            chart.highlightedBin = d.key;
            //Update footnote.
            footnote
                .classed('tableTitle', true)
                .text(
                    `Table displays ${d.values.raw.length} records with ` +
                        `${chart.measure.current} values from ` +
                        `${chart.config.x.d3format1(d.rangeLow)} to ${chart.config.x.d3format1(
                            d.rangeHigh
                        )}. Click outside a bar to remove details.`
                );

            //Draw listing.
            chart.listing.draw(d.values.raw);
            chart.listing.wrap.selectAll('*').style('display', null);

            //Reduce bin opacity and highlight selected bin.
            bins.attr('fill-opacity', 0.5);
            select(this).attr('fill-opacity', 1);
        });
}
