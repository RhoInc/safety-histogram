import { select } from 'd3';

export default function identifyControls() {
    const controlGroups = this.controls.wrap
        .style('padding-bottom', '8px')
        .selectAll('.control-group');

    //Give each control a unique ID.
    controlGroups.attr('id', d => d.label.toLowerCase().replace(' ', '-')).each(function(d) {
        select(this).classed(d.type, true);
    });

    //Give x-axis controls a common class name.
    controlGroups
        .filter(d => ['x.domain[0]', 'x.domain[1]'].indexOf(d.option) > -1)
        .classed('x-axis', true);
}
