import handleSingleObservation from './onResize/handleSingleObservation';
import addBinClickListener from './onResize/addBinClickListener';
import drawNormalRanges from './onResize/drawNormalRanges';
import addClearListing from './onResize/addClearListing';
import maintainBinHighlighting from './onResize/maintainBinHighlighting';
import hideDuplicateXaxisTickLabels from './onResize/hideDuplicateXaxisTickLabels';

export default function onResize() {
    //Draw custom bin for single observation subsets.
    handleSingleObservation.call(this);

    //Display data listing on bin click.
    addBinClickListener.call(this);

    //Visualize normal ranges.
    drawNormalRanges.call(this);

    //Clear listing when clicking outside bins.
    addClearListing.call(this);

    //Keep highlighted bin highlighted on resize.
    maintainBinHighlighting.call(this);

    //Hide duplicate x-axis tick labels (d3 sometimes draws more ticks than the precision allows).
    hideDuplicateXaxisTickLabels.call(this);
}
