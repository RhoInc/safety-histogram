import drawZeroRangeBar from './onResize/drawZeroRangeBar';
import groupBars from './onResize/groupBars';
import addHoverBars from './onResize/addHoverBars';
import addBinEventListeners from './onResize/addBinEventListeners';
import drawNormalRanges from './onResize/drawNormalRanges';
import maintainBinHighlighting from './onResize/maintainBinHighlighting';
import removeXAxisTicks from './onResize/removeXAxisTicks';
import annotateBinBoundaries from './onResize/annotateBinBoundaries';

export default function onResize() {
    // Draw custom bin for single observation subsets.
    drawZeroRangeBar.call(this);

    // Group bars by group-by variable.
    groupBars.call(this);

    // Add invisible bars for improved hovering.
    addHoverBars.call(this);

    // Display data listing on bin click.
    addBinEventListeners.call(this);

    // Visualize normal ranges.
    drawNormalRanges.call(this);

    // Keep highlighted bin highlighted on resize.
    maintainBinHighlighting.call(this);

    // Remove x-axis ticks.
    removeXAxisTicks.call(this);

    // Annotate bin boundaries.
    annotateBinBoundaries.call(this);
}
