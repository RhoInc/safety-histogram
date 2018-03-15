export default function getCurrentMeasure() {
    this.previousMeasure = this.currentMeasure;
    this.currentMeasure = this.filters
        .find(filter => filter.col === this.config.measure_col)
        .val;
}
