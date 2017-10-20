export default function onDataTransform() {
    let context = this;

    //Customize the x-axis label
    if (this.filtered_data.length)
        this.config.x.label =
            `${this.filtered_data[0][this.config.measure_col]}` +
            (this.config.unit_col ? ` (${this.filtered_data[0][this.config.unit_col]})` : ``);
}
