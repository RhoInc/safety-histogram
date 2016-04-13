export default function onDataTransform(){
  const units = this.filtered_data[0] ? this.filtered_data[0][this.config.unit_col] : this.raw_data[0][this.config.unit_col];
  const measure = this.filtered_data[0] ? this.filtered_data[0][this.config.measure_col] : this.raw_data[0][this.config.measure_col];
  //Customize the x-axis label
  this.config.x.label = measure+" level ("+units+")";

  //Reset linked table
  this.table.draw([]);
  this.svg.selectAll('.bar').attr('opacity', 1);
}