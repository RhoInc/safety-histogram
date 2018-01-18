import { updateXDomain } from './util/updateXDomain';

export default function onPreprocess() {
    const chart = this,
    config=this.config;

    //Filter raw data on currently selected measure.
    const measure = this.filters.filter(filter => filter.col === this.config.measure_col)[0].val;
    this.measure_data = this.super_raw_data.filter(d => d[this.config.measure_col] === measure);

    //Set x-domain based on currently selected measure.
    //this.config.x.domain = d3.extent(this.measure_data, d => +d[chart.config.value_col]);

    //Check if the selected measure has changed.
    const prevMeasure = this.currentMeasure;
    this.currentMeasure = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.value_col && d.value_col === config.measure_col)
        .select('option:checked')
        .text();
    const changedMeasureFlag = this.currentMeasure !== prevMeasure;

    //Set x-axis domain.
    if (changedMeasureFlag) {
        //reset axis to full range when measure changes
        this.config.x.domain = d3.extent(this.measure_data, d => +d[config.value_col]);
        this.controls.wrap
            .selectAll('.x-axis')
            .property(
                'title',
                `Initial Limits: [${this.config.x.domain[0]} - ${this.config.x.domain[1]}]`
            );

        //Set x-axis domain controls.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(f => f.option === 'x.domain[0]')
            .select('input')
            .property('value', this.config.x.domain[0]);
        this.controls.wrap
            .selectAll('.control-group')
            .filter(f => f.option === 'x.domain[1]')
            .select('input')
            .property('value', this.config.x.domain[1]);
    }

    //Determine whether currently selected measure contains normal range data.
    if (this.config.normal_range) {
        const hasNormalRange =
            this.measure_data.filter(
                d =>
                    (+d[chart.config.normal_col_low] || !!d[chart.config.normal_col_low]) &&
                    (+d[chart.config.normal_col_high] || !!d[chart.config.normal_col_high])
            ).length > 0;
        const normalRangeInput = this.controls.wrap
            .selectAll('.control-group')
            .filter(d => d.label === 'Normal Range')
            .select('input');

        if (!hasNormalRange)
            normalRangeInput
                .attr('title', 'This measure does not contain normal range data.')
                .style('cursor', 'not-allowed')
                .property('checked', false)
                .property('disabled', true);
        else
            normalRangeInput
                .attr('title', '')
                .style('cursor', 'pointer')
                .property('checked', this.config.displayNormalRange)
                .property('disabled', false);
    }

    //only draw the chart using data from the currently selected x-axis range
    updateXDomain(chart)
    this.raw_data = this.super_raw_data
    .filter(d => d[chart.config.measure_col] === chart.currentMeasure)
    .filter(function(f) {
      var v = chart.config.value_col;
      return ((f[v] >= chart.x_dom[0]) & (f[v] <= chart.x_dom[1]));
    });
}
