import { select } from 'd3';
import mouseout from './mouseout';

export default function mouseover(element, d) {
    // Update bar details footnote.
    this.footnotes.barDetails.html(`Bar encompasses ${d.footnote}.`);

    // Highlight bar.
    const selection = select(element);
    if (!/trident/i.test(navigator.userAgent)) selection.moveToFront();
    selection.selectAll('.bar').attr('stroke', 'black');

    // Highlight corresponding bar in small multiples.
    console.log(d.key);
    this.multiples.multiples.forEach(multiple => {
        multiple.marks[0].groups
            .each(function(di) {
                if (di.key === d.key)
                    console.log(this.remove());
            });
    });
}
