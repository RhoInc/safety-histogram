import { format } from 'd3';

export default function annotatePercentage() {
    this.wrap
        .select('.wc-chart-title')
        .append('span')
        .classed('sh-group-percentage', true)
        .text(` (${format('%')(this.filtered_data.length / this.raw_data.length)} of records)`);
}
