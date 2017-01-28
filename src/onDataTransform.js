export default function onDataTransform() {
    let context = this;

  //Customize the x-axis label
    if (this.filtered_data.length)
        this.config.x.label =
            `${this.filtered_data[0][this.config.measure_col]} (${this.filtered_data[0][this.config.unit_col]})`;

  //Reset linked table
    this.listing.draw([]);
    this.wrap
        .select('.annote')
        .classed('tableTitle', false)
        .text('Click a bar for details.');
    this.svg
        .selectAll('.bar')
        .attr('opacity', 1);
}
