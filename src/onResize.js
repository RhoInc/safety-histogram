import { select, format } from 'd3';
import drawNormalRanges from './util/drawNormalRanges';

export default function onResize() {
    let chart = this;
    let config = this.config;

  //Define listing columns and headers.
    let listing = this.listing;
    listing.config.cols = config.details.map(detail => detail.value_col);
    listing.config.headers = config.details.map(detail => detail.label);

  //Display data listing on bin click.
    var cleanF = format('.3f');
    var bins = this.svg.selectAll('.bar');
    var footnote = this.wrap.select('.annote');

    bins.style('cursor', 'pointer')
        .on('click', function(d) {
          //Update footnote.
            footnote
                .classed('tableTitle', true)
                .text(`Table displays ${d.values.raw.length} records with ` +
                    `${chart.filtered_data[0][config.measure_col]} values from ` +
                    `${cleanF(d.rangeLow)} to ${cleanF(d.rangeHigh)}` + (
                        config.unit_col
                            ? ` ${chart.filtered_data[0][config.unit_col]}`
                            : ``) + `. Click outside a bar to remove details.`);

          //Set pagination
          listing.config.activePage=0;
          listing.config.startIndex = listing.config.activePage * listing.config.nRowsPerPage; // first row shown
          listing.config.endIndex = listing.config.startIndex + listing.config.nRowsPerPage; // last row shown

          //Draw listing.
          listing.draw(d.values.raw);

          //Reduce bin opacity and highlight selected bin.
            bins.attr('fill-opacity', 0.5);
            select(this)
                .attr('fill-opacity', 1);
        })
        .on('mouseover', d => {
          //Update footnote.
            if (footnote.classed('tableTitle') === false)
                footnote
                    .text(`${d.values.raw.length} records with ` +
                        `${chart.filtered_data[0][config.measure_col]} values from ` +
                        `${cleanF(d.rangeLow)} to ${cleanF(d.rangeHigh)}` + (
                            config.unit_col
                                ? ` ${chart.filtered_data[0][config.unit_col]}`
                                : ``)); })
        .on('mouseout', d => {
          //Update footnote.
            if (footnote.classed('tableTitle') === false)
                footnote
                    .text('Click a bar for details.'); });

  //Visualize normal ranges.
    const normalRangeControl = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.label === 'Normal Range');
    if (config.normal_range) {
        if (chart.config.displayNormalRange)
            drawNormalRanges(chart);
        else
            chart.wrap.selectAll('.normalRange').remove();

        normalRangeControl.on('change', function () {
            chart.config.displayNormalRange = d3.select(this)
                .select('input')
                .property('checked');

            if (chart.config.displayNormalRange)
                drawNormalRanges(chart);
            else
                chart.wrap.selectAll('.normalRange').remove();
        });
    } else
        normalRangeControl
            .style('display', 'none');

  //Clear listing when clicking outside bins.
    this.wrap.selectAll('.overlay, .normalRange')
        .on('click', function() {
            listing.draw([]);
            bins.attr('fill-opacity', 0.75);

            if (footnote.classed('tableTitle'))
                footnote
                    .classed('tableTitle', false)
                    .text('Click a bar for details.');
        });
}
