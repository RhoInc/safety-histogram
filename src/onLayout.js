export default function onLayout() {
    let chart = this;

    //Add a button to reset the x-domain
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
                chart.config.x.domain = d3.extent(measure_data, d => +d[chart.config.value_col]); //reset axis to full range

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
