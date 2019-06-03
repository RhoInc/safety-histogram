export default function getCurrentMeasure() {
    this.measure.previous = this.measure.current;
    this.measure.current = this.controls.wrap.selectAll('#measure option:checked').text();
    this.config.x.label = this.measure.current;
    if (this.measure.current !== this.measure.previous) this.config.x.custom_bin = false;
}
