export default function onLayout() {
    let chart = this;

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
