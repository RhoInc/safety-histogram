import { select, format } from 'd3';
import drawNormalRanges from './onResize/drawNormalRanges';

export default function onResize() {
    const chart = this,
        config = this.config;

    //Draw custom bin for single observation subsets.
    this.svg.select('#custom-bin').remove();
    if (this.current_data.length === 1) {
        var datum = this.current_data[0];
        this.svg
            .append('g')
            .classed('bar-group', true)
            .attr('id', 'custom-bin')
            .append('rect')
            .data([datum])
            .classed('wc-data-mark bar', true)
            .attr({
                y: 0,
                height: this.plot_height,
                'shape-rendering': 'crispEdges',
                stroke: 'rgb(102,194,165)',
                fill: 'rgb(102,194,165)',
                'fill-opacity': '0.75',
                width: this.x(datum.values.x * 1.01) - this.x(datum.values.x * 0.99),
                x: this.x(datum.values.x * 0.99)
            });
    }

    //Display data listing on bin click.
    var cleanF = format('.3f');
    var bins = this.svg.selectAll('.bar');
    var footnote = this.wrap.select('.annote');

    bins
        .style('cursor', 'pointer')
        .on('click', function(d) {
            chart.highlightedBin = d.key;
            //Update footnote.
            footnote
                .classed('tableTitle', true)
                .text(
                    `Table displays ${d.values.raw.length} records with ` +
                        `${chart.filtered_data[0][config.measure_col]} values from ` +
                        `${cleanF(d.rangeLow)} to ${cleanF(d.rangeHigh)}` +
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
                        `${cleanF(d.rangeLow)} to ${cleanF(d.rangeHigh)}` +
                        (config.unit_col ? ` ${chart.filtered_data[0][config.unit_col]}` : ``)
                );
        })
        .on('mouseout', d => {
            //Update footnote.
            if (footnote.classed('tableTitle') === false) footnote.text('Click a bar for details.');
        });

    //Visualize normal ranges.
    const normalRangeControl = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.label === 'Normal Range');
    if (config.normal_range) {
        if (chart.config.displayNormalRange) drawNormalRanges(chart);
        else chart.wrap.selectAll('.normalRange').remove();

        normalRangeControl.on('change', function() {
            chart.config.displayNormalRange = select(this)
                .select('input')
                .property('checked');

            if (chart.config.displayNormalRange) drawNormalRanges(chart);
            else chart.wrap.selectAll('.normalRange').remove();
        });
    } else normalRangeControl.style('display', 'none');

    //Clear listing when clicking outside bins.
    this.wrap.selectAll('.overlay, .normalRange').on('click', function() {
        delete chart.highlightedBin;
        chart.listing.draw([]);
        chart.listing.wrap.selectAll('*').style('display', 'none');
        bins.attr('fill-opacity', 0.75);

        if (footnote.classed('tableTitle'))
            footnote.classed('tableTitle', false).text('Click a bar for details.');
    });

    //Keep highlighted bin highlighted on resize.
    if (this.highlightedBin)
        bins.attr('fill-opacity', d => (d.key !== this.highlightedBin ? 0.5 : 1));
}
