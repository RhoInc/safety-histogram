export default function onLayout() {
    let context = this;

  //Add population count container.
    this.controls.wrap
        .append('div')
        .attr('id', 'populationCount')
        .style('font-style', 'italic');

  //Add footnote.
    this.wrap
        .insert('p', '.wc-chart')
        .attr('class', 'annote')
        .text('Click a bar for details.');

  //Add control to hide or display normal range(s).
    if (this.config.normal_range) {
       let normalRange = this.controls.wrap
            .append('div')
            .attr('id', 'NRcheckbox')
            .style('margin', '.5em')
            .text('Normal Range')
                .append('input')
                .attr('type', 'checkbox');
        normalRange.on('change', function () {
            context.wrap.selectAll('.normalRange')
                .attr('visibility', d3.select(this).property('checked')
                    ? 'visible'
                    : 'hidden');
        });
    }
}
