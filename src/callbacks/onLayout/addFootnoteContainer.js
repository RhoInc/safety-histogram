export default function addFootnoteContainer() {
    this.wrap
        .insert('p', '.wc-chart')
        .attr('class', 'annote')
        .style({
            'border-top': '1px solid #ccc',
            'padding-top': '10px'
        })
        .text('Click a bar for details.');
}
