export default function updateXLabel() {
    if (this.filtered_data.length)
        this.config.x.label =
            `${this.filtered_data[0][this.config.measure_col]}` +
            (this.config.unit_col ? ` (${this.filtered_data[0][this.config.unit_col]})` : ``);
}
