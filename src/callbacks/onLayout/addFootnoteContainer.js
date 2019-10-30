export default function addFootnoteContainer() {
    this.footnotes = {
        container: this.wrap
            .insert('div', '.wc-chart')
            .classed('footnotes', true)
            .style({
                'border-top': '1px solid #ccc',
                'padding-top': '10px'
            })
    };
    this.footnotes.barClick = this.footnotes.container
        .append('p')
        .classed('footnote footnote--bar-click', true)
        .text('Click a bar for details.');
    this.footnotes.barDetails = this.footnotes.container
        .append('p')
        .classed('footnote footnote--bar-details', true)
        .html('<br>');
}
