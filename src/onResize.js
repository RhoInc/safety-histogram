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
                .text(`Table displays ${d.values.raw.length} records with ${measure} values from ${cleanF(d.rangeLow)} to ${cleanF(d.rangeHigh)} ${units}. Click outside a bar to remove details.`);
            listing.draw(d.values.raw);
            d3.select('.listing table')
                .style(
                    {'border-collapse': 'separate'
                    ,'background': '#fff'
                    ,'border-radius': '5px'
                    ,'margin': '50px auto'});
            d3.select('.wc-chart thead')
                .style('border-radius', '5px');
            d3.selectAll('.wc-chart thead th')
                .style(
                    {'font-size': '16px'
                    ,'font-weight': '400'
                    ,'color': '#111'
                    ,'text-align': 'left'
                    ,'padding': '10px'
                    ,'background': '#bdbdbd'
                    ,'border-top': '1px solid #858d99'
                    ,'border-bottom': '1px solid #858d99'});
            d3.selectAll('.wc-chart tbody tr td')
                .style(
                    {'font-weight': '400'
                    ,'color': '#5f6062'
                    ,'font-size': '13px'
                    ,'padding': '20px 20px 20px 20px'
                    ,'border-bottom': '1px solid #e0e0e0'});
            d3.selectAll('tbody tr:nth-child(2n)')
                .style('background', '#f0f3f5');
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

  //Visualize normal ranges.
    if (this.raw_data[0][settings.normal_col_low] && this.raw_data[0][settings.normal_col_high]) {
      //Capture distinct normal ranges in filtered data.
        var normalRanges = d3.nest()
            .key(d => `${d[settings.normal_col_low]},${d[settings.normal_col_high]}`) // set key to comma-delimited normal range
            .rollup(d => d.length)
            .entries(this.filtered_data);
        var currentRange = d3.extent(this.filtered_data, d => +d[settings.value_col]);
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
      //Determine whether normal range checkbox is checked.
        var displayNormalRange = d3.select('#NRcheckbox input')
            .property('checked')
      //Add divs to chart for each normal range.
        var canvas = d3.select('.bar-supergroup');
        canvas.selectAll('.normalRange').remove();
        canvas.selectAll('.normalRange rect')
            .data(normalRanges).enter()
            .insert('rect', ':first-child')
            .attr(  {'class': 'normalRange'
                    ,'x': d => chart.x(Math.max(+d.key.split(',')[0], currentRange[0])) // set x to range low
                    ,'y': 0
                    ,'width': d => Math.min(

                        chart.plot_width -
                            chart.x(Math.max(+d.key.split(',')[0], currentRange[0])), // chart width - range low

                        chart.x(+d.key.split(',')[1]) -
                            chart.x(Math.max(+d.key.split(',')[0], currentRange[0]))) // range high - range low

                    ,'height': this.plot_height
                    ,'visibility': displayNormalRange ? 'visible' : 'hidden'})
            .style( {'stroke': 'black'
                    ,'fill': 'black'
                    ,'stroke-opacity': d => d.values/chart.filtered_data.length*.75 // opacity as a function of fraction of records with the given normal range
                    ,'fill-opacity': d => d.values/chart.filtered_data.length*.5}) // opacity as a function of fraction of records with the given normal range
                .append('title')
                .text(d => 'Normal range: ' +
                    d.key.split(',')[0] + "-" +
                    d.key.split(',')[1] + " " + units + ' (' +
                    d3.format('%')(d.values/chart.filtered_data.length) + ' of records)');
    }

    d3.selectAll('.overlay, .normalRange')
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
