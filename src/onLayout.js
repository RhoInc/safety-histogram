import { updateXDomain } from './util/updateXDomain';

export default function onLayout() {
  let chart = this,
  config = this.config;

  function updateLimits() {

    console.log(chart)
    console.log(chart.raw_data.length)
    console.log(chart.filtered_data.length)
    console.log(chart.measure_data.length)
    //update the domain
    updateXDomain(chart);

    //draw the chart on the data from the selected range
    var subRangeData = chart.filtered_data.filter(function(f) {
      var v = chart.config.value_col;
      return (f[v] >= chart.x_dom[0]) & (f[v] <= chart.x_dom[1]);
    });

    console.log(subRangeData.length)
    chart.draw(subRangeData);

    //add annotation about data that's been removed.
  }

  /////////////////////////////////
  //Add controls for X-axis Limits
  /////////////////////////////////

  //x-domain reset button
  const resetContainer = this.controls.wrap
      .insert('div', '.control-group:nth-child(3)')
      .classed('control-group x-axis', true)
      .datum({
        type: 'button',
        option: 'x.domain',
        label: 'x-axis:'
      }),
    resetLabel = resetContainer
      .append('span')
      .attr('class', 'control-label')
      .style('text-align', 'right')
      .text('X-axis:'),
    resetButton = resetContainer
      .append('button')
      .text('Reset Limits')
      .on('click', function() {
        const measure_data = chart.raw_data.filter(
          d => d[chart.config.measure_col] === chart.currentMeasure
        );
        chart.config.x.domain = d3.extent(
          measure_data,
          d => +d[config.value_col]
        ); //reset axis to full range

        chart.controls.wrap
          .selectAll('.control-group')
          .filter(f => f.option === 'x.domain[0]')
          .select('input')
          .property('value', chart.config.x.domain[0]);

        chart.controls.wrap
          .selectAll('.control-group')
          .filter(f => f.option === 'x.domain[1]')
          .select('input')
          .property('value', chart.config.x.domain[1]);

        chart.draw();
      });

  //x-domain lower limit
  const lowerLimitContainer = this.controls.wrap
      .insert('div', '.control-group:nth-child(4)')
      .classed('control-group x-axis', true)
      .datum({
        type: 'number',
        option: 'x.domain[0]',
        label: 'Lower Limit'
      }),
    lowerLimitLabel = lowerLimitContainer
      .append('span')
      .attr('class', 'control-label')
      .style('text-align', 'right')
      .text('Lower Limit'),
    lowerLimitControl = lowerLimitContainer
      .append('input')
      .on('change', updateLimits);

  //x-domain upper limit
  const upperLimitContainer = this.controls.wrap
      .insert('div', '.control-group:nth-child(5)')
      .classed('control-group x-axis', true)
      .datum({
        type: 'number',
        option: 'x.domain[1]',
        label: 'Upper Limit'
      }),
    upperLimitLabel = upperLimitContainer
      .append('span')
      .attr('class', 'control-label')
      .style('text-align', 'right')
      .text('Upper Limit'),
    upperLimitControl = upperLimitContainer
      .append('input')
      .on('change', updateLimits);

  //Add x-axis class to x-axis limit controls.
  this.controls.wrap
    .selectAll('.control-group')
    .filter(d => ['Lower Limit', 'Upper Limit'].indexOf(d.label) > -1)
    .classed('x-axis', true);

  //Add population count container.
  this.controls.wrap
    .append('div')
    .attr('id', 'populationCount')
    .style('font-style', 'italic');

  //Add footnote.
  this.wrap
    .insert('p', '.wc-chart')
    .attr('class', 'annote')
    .text('Click a bar for details.');
}
