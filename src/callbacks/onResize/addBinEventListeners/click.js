import { select as d3select } from 'd3';
import select from './click/select';
import deselect from './click/deselect';

export default function click(element, d) {
    this.highlightedBin = d.key;
    this.highlighteD = d;
    const selection = d3select(element);
    const selected = selection.classed('selected');
    this.svg.selectAll('.bar-group').classed('selected', false);
    selection.classed('selected', !selected);

    if (!selected) select.call(this, element, d);
    else deselect.call(this, element, d);
}
