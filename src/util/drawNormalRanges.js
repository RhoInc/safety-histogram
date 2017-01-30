export default function drawNormalRanges(chart) {
  //Clear normal ranges.
    let canvas = chart.wrap.select('.bar-supergroup');
    canvas.selectAll('.normalRange').remove();

  //Check whether current measure has any normal ranges.
    const normalRange = chart.filtered_data
        .filter(d =>
            (+d[chart.config.normal_col_low ] || d[chart.config.normal_col_low ].trim() === 0) &&
            (+d[chart.config.normal_col_high] || d[chart.config.normal_col_high].trim() === 0))
        .length;

    if (normalRange) {
        chart.controls.wrap.select('#NRcheckbox').style('display', 'block');
      //Capture distinct normal ranges in filtered data.
        var normalRanges = d3.nest()
            .key(d => `${d[chart.config.normal_col_low]},${d[chart.config.normal_col_high]}`) // set key to comma-delimited normal range
            .rollup(d => d.length)
            .entries(chart.filtered_data);
        var currentRange = d3.extent(chart.filtered_data, d => +d[chart.config.value_col]);
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
        var displayNormalRange = chart.controls.wrap.select('#NRcheckbox input')
            .property('checked')
      //Add divs to chart for each normal range.
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

                    ,'height': chart.plot_height
                    ,'visibility': displayNormalRange ? 'visible' : 'hidden'})
            .style( {'stroke': 'black'
                    ,'fill': 'black'
                    ,'stroke-opacity': d => d.values/chart.filtered_data.length*.75 // opacity as a function of fraction of records with the given normal range
                    ,'fill-opacity': d => d.values/chart.filtered_data.length*.5}) // opacity as a function of fraction of records with the given normal range
                .append('title')
                .text(d => `Normal range: ${d.key.split(',')[0]}-${d.key.split(',')[1]}` + (
                    chart.config.unit_col
                        ? `${chart.filtered_data[0][chart.config.unit_col]}`
                        : ``) +
                    ` (${d3.format('%')(d.values/chart.filtered_data.length)} of records)`);
    } else
        chart.controls.wrap.select('#NRcheckbox').style('display', 'none');
}
