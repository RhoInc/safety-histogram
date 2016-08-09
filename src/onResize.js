import { select, format } from 'd3';

export default function onResize() {
    const config = this.config;
    const measure = this.filtered_data[0] ?
        this.filtered_data[0][this.config.measure_col] :
        this.raw_data[0][this.config.measure_col];
    const units = this.filtered_data[0] ?
        this.filtered_data[0][this.config.unit_col] :
        this.raw_data[0][this.config.unit_col];

    var listing = this.table;

  //Display data listing on bin click.
    var cleanF = format('.3f');
    var bins = this.svg.selectAll('.bar');
    var footnote = this.wrap.select('.annote');

    bins.style('cursor', 'pointer')
        .on('click', function(d) {
            footnote
                .classed('tableTitle',true)
                .text(`Table displays ${d.values.raw.length} records with ${measure} values from ${cleanF(d.rangeLow)} to ${cleanF(d.rangeHigh)} ${units}.`);
            listing.draw(d.values.raw);
            bins.attr('fill-opacity', 0.5);
            select(this).attr('fill-opacity', 1); })
        .on('mouseover' ,function(d) {
            if (footnote.classed('tableTitle') === false) {
                footnote.text(`${d.values.raw.length} records with ${measure} values from ${cleanF(d.rangeLow)} to ${cleanF(d.rangeHigh)} ${units}.`);
            } })
        .on('mouseout',function(d) {
            if (footnote.classed('tableTitle') === false) {
                footnote.text('Click a bar for details.');
            } });

    this.svg.select('.overlay')
        .on('click', function() {
            listing.draw([]);
            bins.attr('fill-opacity', 0.75);

            if (footnote.classed('tableTitle')) {
                footnote
                    .classed('tableTitle', false)
                    .text('Click a bar for details.');
            }
        });

  //Add normal ranges.
    if (this.raw_data[0][settings.normal_col_low] && this.raw_data[0][settings.normal_col_high]) {
        var normalRange =
            [d3.median(this.filtered_data, d => d[settings.normal_col_low])
            ,d3.median(this.filtered_data, d => d[settings.normal_col_high])];

        var canvas = d3.select('.bar-supergroup');
        canvas.select('#normalRange').remove();
        canvas
            .insert('rect', ':first-child')
            .attr(
                {id: 'normalRange'
                ,x: Math.max(0, this.x(normalRange[0]))
                ,y: 0
                ,width: Math.min(this.plot_width - this.x(normalRange[0]), this.x(normalRange[1]) - this.x(normalRange[0]))
                ,height: this.plot_height})
            .style(
                {stroke: '#fc8d62'
                ,fill: '#fc8d62'
                ,'fill-opacity': .25
                ,'stroke-opacity': .25})
                .append('title')
                .text(`${measure} normal range: ${normalRange[0]}-${normalRange[1]} ${units}`);
    }
}
