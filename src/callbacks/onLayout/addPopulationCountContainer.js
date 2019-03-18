export default function addPopulationCountContainer() {
    this.controls.wrap
        .append('div')
        .attr('id', 'populationCount')
        .style('font-style', 'italic');
}
