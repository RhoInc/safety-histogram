export default function onPreprocess() {
    const chart = this;

  //Filter raw data on currently selected measure.
    const measure = this.filters
        .filter(filter => filter.col === this.config.measure_col)[0]
        .val;
    this.measure_data = this.raw_data
        .filter(d => d[this.config.measure_col] === measure);

  //Set x-domain based on currently selected measure.
    this.config.x.domain = d3.extent(this.measure_data, d => +d[chart.config.value_col]);

  //Determine whether currently selected measure contains normal range data.
    if (this.config.normal_range) {
        const hasNormalRange = this.measure_data
            .filter(d => (
                +d[chart.config.normal_col_low ] || !!d[chart.config.normal_col_low ]) && (
                +d[chart.config.normal_col_high] || !!d[chart.config.normal_col_high]))
            .length > 0;
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
}
