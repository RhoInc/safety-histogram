import getCurrentMeasure from './onPreprocess/getCurrentMeasure';
import defineMeasureData from './onPreprocess/defineMeasureData';
import setXdomain from './onPreprocess/setXdomain';
import calculateStatistics from './onPreprocess/calculateStatistics';
import calculateBinWidth from './onPreprocess/calculateBinWidth';
import calculateXPrecision from './onPreprocess/calculateXPrecision';
import updateControls from './onPreprocess/updateControls';
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

    // 4a Define precision of measure - needed in step 5a and 5b.
    calculateXPrecision.call(this);

    // 4b Calculate bin width - needed in step 5c.
    calculateBinWidth.call(this);

    // 5a Update x-axis and bin controls after.
    updateControls.call(this);

    // 5b Define bin boundaries given bin width and precision.
    defineBinBoundaries.call(this);

    console.log(this.raw_data);
}
