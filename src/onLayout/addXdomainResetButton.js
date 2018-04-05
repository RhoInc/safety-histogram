import { extent } from 'd3';

export default function addXdomainResetButton() {
    //Add x-domain reset button container.
    const resetContainer = this.controls.wrap
        .insert('div', '.control-group:nth-child(3)')
        .classed('control-group x-axis', true)
        .datum({
            type: 'button',
            option: 'x.domain',
            label: 'x-axis:'
        });

    //Add label.
    resetContainer
        .append('span')
        .attr('class', 'wc-control-label')
        .style('text-align', 'right')
        .text('X-axis:');

    //Add button.
    resetContainer
        .append('button')
        .text('Reset Limits')
        .on('click', () => {
            this.config.x.domain = this.measure_domain;

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
