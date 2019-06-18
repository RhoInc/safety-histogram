export default function addBinsResetButton() {
    //Add bins reset button container.
    this.controls.resetBins = {
        container: this.controls.wrap
            .insert('div', '#bins')
            .classed('control-group bins', true)
            .datum({
                type: 'button',
                option: 'x.custom_bin',
                label: ''
            })
            .style('vertical-align', 'bottom')
    };

    //Add label.
    this.controls.resetBins.label = this.controls.resetBins.container
        .append('span')
        .attr('class', 'wc-control-label')
        .text('');

    //Add button.
    this.controls.resetBins.button = this.controls.resetBins.container
        .append('button')
        .text(' Reset Bins ')
        .style('padding', '0px 5px')
        .on('click', () => {
            this.config.x.custom_bin = false;
            this.draw();
        });
}
