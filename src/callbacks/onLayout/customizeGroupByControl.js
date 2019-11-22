import { select } from 'd3';

export default function customizeGroupByControl() {
    const context = this;

    const groupControl = this.controls.wrap.selectAll('.control-group#group-by');
    this.containers.multiples.node().appendChild(groupControl.node());

    // Hide group-by control when no groups are specified.
    if (groupControl.datum().values.length === 1) groupControl.style('display', 'none');
    else {
        const select = groupControl.selectAll('select').on('change', function(d) {
            context.config.group_label = this.value;
            context.config.group_by = context.config.groups.find(
                group => group.label === this.value
            ).value_col;
            context.draw();
        });

        const options = select
            .selectAll('option')
            .property(
                'selected',
                d =>
                    this.config.groups.find(group => group.label === d).value_col ===
                    this.config.group_by
            )
            .style('display', function(d, i) {
                return i > 0 && this.value === 'None' ? 'none' : null;
            });
    }
}
