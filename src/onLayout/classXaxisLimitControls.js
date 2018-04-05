export default function classXaxisLimitControls() {
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => ['Lower Limit', 'Upper Limit'].indexOf(d.label) > -1)
        .classed('x-axis', true);
}
