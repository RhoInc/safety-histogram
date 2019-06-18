export default function updateXAxisLimits() {
    this.controls.wrap
        .selectAll('#lower input')
        .attr('step', this.measure.step) // set in ./calculateXPrecision
        .style('box-shadow', 'none')
        .property('value', this.config.x.d3format1(this.config.x.domain[0]));

    this.controls.wrap
        .selectAll('#upper input')
        .attr('step', this.measure.step) // set in ./calculateXPrecision
        .style('box-shadow', 'none')
        .property('value', this.config.x.d3format1(this.config.x.domain[1]));
}
