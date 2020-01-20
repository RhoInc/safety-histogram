import { select as d3select } from 'd3';
import select from './click/select';
import deselect from './click/deselect';

export default function click(element, d) {
    const safetyHistogram = this.sh ? this.sh : this;

    safetyHistogram.highlightedBin = d.key;
    safetyHistogram.highlighteD = d;

    const selection = d3select(element);
    const selected = selection.classed('selected');

    // De-select all bars in the main chart.
    safetyHistogram.svg.selectAll('.bar-group').classed('selected', false);
    console.log(safetyHistogram.svg.selectAll('.bar-group'));

    // De-select all bars in the small multiples.
    if (
        safetyHistogram.config.draw_multiples &&
        safetyHistogram.multiples &&
        safetyHistogram.multiples.multiples
    ) {
        safetyHistogram.multiples.multiples.forEach(multiple => {
            multiple.svg.selectAll('.bar-group').classed('selected', false);
        });
    }

    // Toggle selected class of clicked bar.
    selection.classed('selected', !selected);

    if (!selected) select.call(this, element, d);
    else deselect.call(this, element, d);
}
