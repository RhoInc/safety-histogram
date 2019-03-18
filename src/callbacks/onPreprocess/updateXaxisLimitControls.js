export default function updateXaxisLimitControls() {
    //Update x-axis limit controls.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'x.domain[0]')
        .select('input')
        .property('value', this.config.x.formatted_domain[0]);
    this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'x.domain[1]')
        .select('input')
        .property('value', this.config.x.formatted_domain[1]);
}
