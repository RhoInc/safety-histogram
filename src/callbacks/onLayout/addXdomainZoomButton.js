import { extent } from 'd3';

export default function addXdomainZoomButton() {
    if (this.filters.find(filter => filter.col !== 'sh_measure')) {
        //Add x-domain zoom button container.
        const resetContainer = this.controls.wrap
            .select('.x-axis-limits-grouping-fieldset')
            .append('div')
            .classed('control-group x-axis', true)
            .datum({
                type: 'button',
                option: 'x.domain',
                label: ''
            })
            .attr('title', 'Zoom in on filtered histogram.')
            .style({
                'vertical-align': 'bottom',
                'margin-top': '0px',
                'margin-right': '2px',
                'margin-bottom': '2px',
                'margin-left': '2px'
            });

        //Add label.
        resetContainer
            .append('span')
            .attr('class', 'wc-control-label')
            .text('');

        //Add button.
        resetContainer
            .append('button')
            .text(' Zoom ')
            .style('padding', '0px 5px')
            .on('click', () => {
                this.config.x.domain = this.measure.filtered.domain;

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
}
