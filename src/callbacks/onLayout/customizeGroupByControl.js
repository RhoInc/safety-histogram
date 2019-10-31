import { select } from 'd3';

export default function customizeGroupByControl() {
    const context = this;

    const groupControl = this.controls.wrap
        .selectAll('.control-group#group-by');

    // Hide group-by control when no groups are specified.
    if (groupControl.datum().values.length === 1) groupControl.style('display', 'none');
    else {
        const select = groupControl
            .selectAll('select')
            .on('change', function(d) {
                const label = select(this)
                    .selectAll('option:checked')
                    .text();
                const value_col = context.config.groups.find(group => group.label === label)
                    .value_col;
                context.config.marks[0].per[0] = value_col;
                context.config.color_by = value_col;
                context.config.legend.label = label;
                context.draw();
            });

        const options = select
            .selectAll('option')
            .property('selected', d => d === this.config.legend.label)
            .style('display', function(d,i) { return i > 0 && this.value === 'None' ? 'none' : null; });
    }
}
