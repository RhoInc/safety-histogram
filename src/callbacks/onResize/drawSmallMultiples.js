import { createChart, multiply } from 'webcharts';
import defineSettings from './drawSmallMultiples/defineSettings';
import runKolmogorovSmirnovTest from './drawSmallMultiples/runKolmogorovSmirnovTest';

export default function drawSmallMultiples() {
    // Update settings.
    const settings = defineSettings.call(this);

    // Destroy previously drawn small multiples.
    if (this.multiples)
        this.multiples.destroy();

    // Instantiate small multiples.
    this.multiples = createChart(
        this.containers.multiples.node(),
        settings
    );

    this.multiples.on('resize', function() {
        const ks = runKolmogorovSmirnovTest.call(this);
        this.wrap
            .select('.wc-chart-title')
            .append('span')
            .classed('sh-ks-test', true)
            .text(`p = ${d3.format('.2f')(ks.p)}`);
        console.log(ks);
    });

    // Initialize small multiples.
    multiply(
        this.multiples,
        this.filtered_data.slice(),
        this.config.group_by,
    );
}
