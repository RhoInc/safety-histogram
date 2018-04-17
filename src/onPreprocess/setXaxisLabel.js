export default function setXaxisLabel() {
    this.config.x.label =
        this.currentMeasure +
        (this.config.unit_col && this.measure_data[0][this.config.unit_col]
            ? ' (' + this.measure_data[0][this.config.unit_col] + ')'
            : '');
}
