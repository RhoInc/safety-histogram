import { select, format } from 'd3';
import drawNormalRanges from './util/drawNormalRanges';

export default function onResize() {
    let context = this;
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
            footnote
                .classed('tableTitle',true)
                .text(`Table displays ${d.values.raw.length} records with ${context.filtered_data[0][config.measure_col]} values from ${cleanF(d.rangeLow)} to ${cleanF(d.rangeHigh)} ${context.filtered_data[0][config.unit_col]}. Click outside a bar to remove details.`);
            listing.draw(d.values.raw);
            listing.wrap.select('.listing table')
                .style(
                    {'border-collapse': 'separate'
                    ,'background': '#fff'
                    ,'border-radius': '5px'
                    ,'margin': '50px auto'});
            listing.wrap.select('.wc-chart thead')
                .style('border-radius', '5px');
            listing.wrap.selectAll('.wc-chart thead th')
                .style(
                    {'font-size': '16px'
                    ,'font-weight': '400'
                    ,'color': '#111'
                    ,'text-align': 'left'
                    ,'padding': '10px'
                    ,'background': '#bdbdbd'
                    ,'border-top': '1px solid #858d99'
                    ,'border-bottom': '1px solid #858d99'});
            listing.wrap.selectAll('.wc-chart tbody tr td')
                .style(
                    {'font-weight': '400'
                    ,'color': '#5f6062'
                    ,'font-size': '13px'
                    ,'padding': '20px 20px 20px 20px'
                    ,'border-bottom': '1px solid #e0e0e0'});
            listing.wrap.selectAll('tbody tr:nth-child(2n)')
                .style('background', '#f0f3f5');
            bins.attr('fill-opacity', 0.5);
            select(this).attr('fill-opacity', 1); })
        .on('mouseover' ,function(d) {
            if (footnote.classed('tableTitle') === false) {
                footnote.text(`${d.values.raw.length} records with ${context.filtered_data[0][config.measure_col]} values from ${cleanF(d.rangeLow)} to ${cleanF(d.rangeHigh)} ${context.filtered_data[0][config.unit_col]}.`);
            } })
        .on('mouseout',function(d) {
            if (footnote.classed('tableTitle') === false) {
                footnote.text('Click a bar for details.');
            } });

  //Visualize normal ranges.
    if (config.normal_range)
        drawNormalRanges(this);

  //Clear listing when clicking outside bins.
    this.wrap.selectAll('.overlay, .normalRange')
        .on('click', function() {
            listing.draw([]);
            bins.attr('fill-opacity', 0.75);

            if (footnote.classed('tableTitle')) {
                footnote
                    .classed('tableTitle', false)
                    .text('Click a bar for details.');
            }
        });
}
