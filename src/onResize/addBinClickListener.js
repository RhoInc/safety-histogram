import { select, format } from 'd3';

export default function addBinClickListener() {
    const chart = this;
    const config = this.config;
    const bins = this.svg.selectAll('.bar');
    const footnote = this.wrap.select('.annote');

    bins.style('cursor', 'pointer')
        .on('click', function(d) {
            chart.highlightedBin = d.key;
            //Update footnote.
            footnote
                .classed('tableTitle', true)
                .text(
                    `Table displays ${d.values.raw.length} records with ` +
                        `${chart.filtered_data[0][config.measure_col]} values from ` +
                        `${chart.config.x.d3_format1(d.rangeLow)} to ${chart.config.x.d3_format1(
                            d.rangeHigh
                        )}` +
                        (config.unit_col ? ` ${chart.filtered_data[0][config.unit_col]}` : ``) +
                        `. Click outside a bar to remove details.`
                );

            //Draw listing.
            chart.listing.draw(d.values.raw);
            chart.listing.wrap.selectAll('*').style('display', null);

            //Reduce bin opacity and highlight selected bin.
            bins.attr('fill-opacity', 0.5);
            select(this).attr('fill-opacity', 1);
        })
        .on('mouseover', d => {
            //Update footnote.
            if (footnote.classed('tableTitle') === false)
                footnote.text(
                    `${d.values.raw.length} records with ` +
                        `${chart.filtered_data[0][config.measure_col]} values from ` +
                        `${chart.config.x.d3_format1(d.rangeLow)} to ${chart.config.x.d3_format1(
                            d.rangeHigh
                        )}` +
                        (config.unit_col ? ` ${chart.filtered_data[0][config.unit_col]}` : ``)
                );
        })
        .on('mouseout', d => {
            //Update footnote.
            if (footnote.classed('tableTitle') === false) footnote.text('Click a bar for details.');
        });
}
