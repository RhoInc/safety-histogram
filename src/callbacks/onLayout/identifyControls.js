import { select } from 'd3';

export default function identifyControls() {
    const context = this;

    const controlGroups = this.controls.wrap
        .style('padding-bottom', '8px')
        .selectAll('.control-group');

    //Give each control a unique ID.
    controlGroups.attr('id', d => d.label.toLowerCase().replace(/ /g, '-')).each(function(d) {
        const controlGroup = d3.select(this);
        controlGroup.classed(d.type, true);
        context.controls[d.label] = controlGroup;
    });

    //Give x-axis controls a common class name.
    controlGroups
        .filter(d => ['x.domain[0]', 'x.domain[1]'].indexOf(d.option) > -1)
        .classed('x-axis', true);

    //Give binning controls a common class name.
    controlGroups
        .filter(d => ['x.bin_algorithm', 'x.bin', 'x.bin_width'].indexOf(d.option) > -1)
        .classed('bin', true);
}
