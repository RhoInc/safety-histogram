import handleSingleObservation from './onResize/handleSingleObservation';
import addHoverBars from './onResize/addHoverBars';
import addBinEventListeners from './onResize/addBinEventListeners';
import drawNormalRanges from './onResize/drawNormalRanges';
import maintainBinHighlighting from './onResize/maintainBinHighlighting';
import hideDuplicateXaxisTickLabels from './onResize/hideDuplicateXaxisTickLabels';

export default function onResize() {
    //Draw custom bin for single observation subsets.
    handleSingleObservation.call(this);

    //Add invisible bars for improved hovering.
    addHoverBars.call(this);

    //Display data listing on bin click.
    addBinEventListeners.call(this);

    //Visualize normal ranges.
    drawNormalRanges.call(this);

    //Keep highlighted bin highlighted on resize.
    maintainBinHighlighting.call(this);

    //Hide duplicate x-axis tick labels (d3 sometimes draws more ticks than the precision allows).
    hideDuplicateXaxisTickLabels.call(this);
}
