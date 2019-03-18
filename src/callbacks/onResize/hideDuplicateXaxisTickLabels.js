import { select } from 'd3';

export default function hideDuplicateXaxisTickLabels() {
    this.svg.selectAll('.x.axis .tick').each(function(d, i) {
        const tick = select(this);
        const value = +d;
        const text = +tick.select('text').text();
        tick.style('display', value === text ? 'block' : 'none');
    });
}
