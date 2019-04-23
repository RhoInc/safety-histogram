export default function insertGrouping(selector, label) {
    const className = label.toLowerCase().replace(/ /g, '-') + '-grouping';
    const div = this.controls.wrap
        .insert('div', selector)
        .classed(`${className}-div`, true)
        .style({
            display: 'inline-block',
            'margin-right': '5px'
        });
    const fieldset = div
        .append('fieldset')
        .classed(`${className}-fieldset`, true)
        .style('padding', '0px 2px');
    const legend = fieldset
        .append('legend')
        .classed(`${className}-legend`, true)
        .text(label);
    this.controls.wrap.selectAll(selector).each(function(d) {
        this.style.marginTop = '0px';
        this.style.marginRight = '2px';
        this.style.marginBottom = '2px';
        this.style.marginLeft = '2px';
        fieldset.node().appendChild(this);
    });
}
