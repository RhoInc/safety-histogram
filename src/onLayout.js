import addXdomainResetButton from './onLayout/addXdomainResetButton';

export default function onLayout() {
    //Add button to that reset x-domain.
    addXdomainResetButton.call(this);

    //Add x-axis class to x-axis limit controls.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => ['Lower Limit', 'Upper Limit'].indexOf(d.label) > -1)
        .classed('x-axis', true);

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
}
