export default function onDataTransform() {
    const measure = this.filtered_data[0] ?
        this.filtered_data[0][this.config.measure_col] :
        this.raw_data[0][this.config.measure_col];
    const units = this.filtered_data[0] ?
        this.filtered_data[0][this.config.unit_col] :
        this.raw_data[0][this.config.unit_col];

  //Customize the x-axis label
    this.config.x.label = measure + " ("+units+")";

  //Reset linked table
    this.table.draw([]);
    this.wrap.select('.annote')
    .classed('tableTitle', false)
    .text('Click a bar for details.');
    this.svg.selectAll('.bar')
        .attr('opacity', 1);
}
