import { extent } from 'd3';

export default function addXdomainResetButton() {
    // Add x-domain reset button container.
    this.controls.reset = {
        container: this.controls.wrap
            .insert('div', '#lower')
            .classed('control-group x-axis', true)
            .datum({
                type: 'button',
                option: 'x.domain',
                label: ''
            })
            .style('vertical-align', 'bottom')
    };

    // Add label.
    this.controls.reset.label = this.controls.reset.container
        .append('span')
        .attr('class', 'wc-control-label')
        .text('');

    // Add button.
    this.controls.reset.button = this.controls.reset.container
        .append('button')
        .text(' Reset ')
        .style('padding', '0px 5px')
        .on('click', () => {
            this.config.x.domain = this.measure.raw.domain;

            this.controls.wrap
                .selectAll('.control-group')
                .filter(f => f.option === 'x.domain[0]')
                .select('input')
                .property('value', this.config.x.domain[0]);

            this.controls.wrap
                .selectAll('.control-group')
                .filter(f => f.option === 'x.domain[1]')
                .select('input')
                .property('value', this.config.x.domain[1]);

            this.draw();
        });
}
