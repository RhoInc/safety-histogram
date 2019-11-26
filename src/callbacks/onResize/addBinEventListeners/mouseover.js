import { select } from 'd3';
import mouseout from './mouseout';

export default function mouseover(element, d) {
    const context = this;
    const safetyHistogram = this.sh ? this.sh : this;

    // Update bar details footnote.
    safetyHistogram.footnotes.barDetails.html(`Bar encompasses ${d.footnote}.`);

    // Highlight bar.
    const selection = select(element);
    if (!/trident/i.test(navigator.userAgent)) selection.moveToFront();
    selection.selectAll('.bar').attr('stroke', 'black');

    // Highlight corresponding bar in small multiples.
    if (this.config.draw_multiples) {
        const otherCharts = this.multiples
            ? this.multiples.multiples
            : this.parent.multiples
                  .filter(multiple => multiple.filters[0].val !== this.filters[0].val)
                  .concat(safetyHistogram);
        otherCharts.forEach(chart => {
            chart.marks[0].groups.each(function(di) {
                if (di.key === d.key) {
                    const selection = select(this);
                    if (!/trident/i.test(navigator.userAgent)) selection.moveToFront();
                    selection.selectAll('.bar').attr('stroke', 'black');
                }
            });
        });
    }
}
