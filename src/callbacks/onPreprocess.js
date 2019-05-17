import getCurrentMeasure from './onPreprocess/getCurrentMeasure';
import defineMeasureData from './onPreprocess/defineMeasureData';
import setXdomain from './onPreprocess/setXdomain';
import calculateStatistics from './onPreprocess/calculateStatistics';
import calculateBinWidth from './onPreprocess/calculateBinWidth';
import calculateXPrecision from './onPreprocess/calculateXPrecision';
import updateXaxisLimitControls from './onPreprocess/updateXaxisLimitControls';
import updateXaxisResetButton from './onPreprocess/updateXaxisResetButton';
import defineBinBoundaries from './onPreprocess/defineBinBoundaries';

export default function onPreprocess() {
    // 1. Capture currently selected measure - needed in 2a.
    getCurrentMeasure.call(this);

    // 2. Filter data on currently selected measure - needed in 3a and 3b.
    defineMeasureData.call(this);

    // 3a Set x-domain given currently selected measure - needed in 4a and 4b.
    setXdomain.call(this);

    // 3b Calculate statistics - needed in 4a and 4b.
    calculateStatistics.call(this);

    // 4a Define precision of measure - needed in step 5a, 5b, and 5c.
    calculateXPrecision.call(this);

    // 4b Calculate bin width - needed in step 5c.
    calculateBinWidth.call(this);

    // 5a Update x-axis reset button when measure changes.
    updateXaxisResetButton.call(this);

    // 5b Update x-axis limit controls to match x-axis domain.
    updateXaxisLimitControls.call(this);

    // 5c Define bin boundaries given bin width and precision.
    defineBinBoundaries.call(this);
}
