export default function addFootnoteContainer() {
    this.wrap
        .insert('p', '.wc-chart')
        .attr('class', 'annote')
        .text('Click a bar for details.');
}
