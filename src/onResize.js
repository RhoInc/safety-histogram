import { select, format } from 'd3';

export default function onResize() {
    const chart = this;
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
      //Capture distinct normal ranges in filtered data.
        var normalRanges = d3.nest()
            .key(d => `${d[settings.normal_col_low]},${d[settings.normal_col_high]}`) // set key to comma-delimited normal range
            .rollup(d => d.length)
            .entries(this.filtered_data);
      //Sort normal ranges so larger normal ranges plot beneath smaller normal ranges.
        normalRanges.sort(function(a,b) {
            var a_lo = a.key.split(',')[0];
            var a_hi = a.key.split(',')[1];
            var b_lo = b.key.split(',')[0];
            var b_hi = b.key.split(',')[1];
            return  a_lo <= b_lo && a_hi >= b_hi ?  2 : // lesser minimum and greater maximum
                    a_lo >= b_lo && a_hi <= b_hi ? -2 : // greater minimum and lesser maximum 
                    a_lo <= b_lo && a_hi <= b_hi ?  1 : // lesser minimum and lesser maximum
                    a_lo >= b_lo && a_hi >= b_hi ? -1 : // greater minimum and greater maximum 
                        1;});
      //Add divs to chart for each normal range.
        var canvas = d3.select('.bar-supergroup');
        canvas.selectAll('.normalRange').remove();
        canvas.selectAll('.normalRange rect')
            .data(normalRanges).enter()
            .insert('rect', ':first-child')
            .attr(  {'class': 'normalRange'
                    ,'x': d => chart.x(+d.key.split(',')[0]) // set x to range low
                    ,'y': 0
                    ,'width': d => Math.min
                        (chart.plot_width - chart.x(+d.key.split(',')[0]) // chart width - range low
                        ,chart.x(+d.key.split(',')[1]) - chart.x(+d.key.split(',')[0])) // range high - range low
                    ,'height': this.plot_height})
            .style( {'stroke': '#fc8d62'
                    ,'fill': '#fc8d62'
                    ,'fill-opacity': d => d.values/chart.filtered_data.length*.75 // opacity as a function of fraction of records with the given normal range
                    ,'stroke-opacity': d => d.values/chart.filtered_data.length*.75}) // opacity as a function of fraction of records with the given normal range
                .append('title')
                .text(d => 'Normal range: ' +
                    d.key.split(',')[0] + "-" +
                    d.key.split(',')[1] + " " + units + ' (' +
                    d3.format('%')(d.values/chart.filtered_data.length) + ' of records)');
        }
}
