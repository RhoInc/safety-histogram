export default function addFootnoteContainer() {
    this.footnotes = {
        container: this.wrap.insert('div', '.wc-chart').classed('sh-footnotes', true)
    };
    this.footnotes.barClick = this.footnotes.container
        .append('p')
        .classed('sh-foot-note sh-foot-note--bar-click', true)
        .text('Click a bar for details.');
    this.footnotes.barDetails = this.footnotes.container
        .append('p')
        .classed('sh-foot-note sh-foot-note--bar-details', true)
        .html('<br>');
}
