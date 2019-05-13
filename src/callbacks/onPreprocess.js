import getCurrentMeasure from './onPreprocess/getCurrentMeasure';
import defineMeasureData from './onPreprocess/defineMeasureData';
import setXdomain from './onPreprocess/setXdomain';
import calculateStatistics from './onPreprocess/calculateStatistics';
import calculateBinWidth from './onPreprocess/calculateBinWidth';
import calculateXPrecision from './onPreprocess/calculateXPrecision';
import setXaxisLabel from './onPreprocess/setXaxisLabel';
import updateXaxisLimitControls from './onPreprocess/updateXaxisLimitControls';
import updateXaxisResetButton from './onPreprocess/updateXaxisResetButton';
import defineBinBoundaries from './onPreprocess/defineBinBoundaries';

export default function onPreprocess() {
    // 1. Capture currently selected measure - needed in 2a.
    getCurrentMeasure.call(this);

    // 2a Filter data on currently selected measure - needed in 3a and 3b.
    defineMeasureData.call(this);

    // 2b Set x-axis label to current measure.
    setXaxisLabel.call(this);

    // 3a Set x-domain given currently selected measure - needed in 4a and 4b.
    setXdomain.call(this);

    // 3b Calculate statistics - needed in 4c and 4d.
    calculateStatistics.call(this);

    // 4a Update x-axis reset button when measure changes.
    updateXaxisResetButton.call(this);

    // 4b Update x-axis limit controls to match x-axis domain.
    updateXaxisLimitControls.call(this);

    // 4c Calculate bin width - needed in step 5.
    calculateBinWidth.call(this);

    // 4d Define precision of measure - needed in step 5.
    calculateXPrecision.call(this);

    // 5. Define bin boundaries given bin width and precision.
    defineBinBoundaries.call(this);
}
