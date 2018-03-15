import getCurrentMeasure from './onPreprocess/getCurrentMeasure';
import defineMeasureData from './onPreprocess/defineMeasureData';
import setXdomain from './onPreprocess/setXdomain';
import setXaxisLabel from './onPreprocess/setXaxisLabel';
import setXprecision from './onPreprocess/setXprecision';
import updateXaxisLimitControls from './onPreprocess/updateXaxisLimitControls';
import updateXaxisResetButton from './onPreprocess/updateXaxisResetButton';

export default function onPreprocess() {
    // 1. Capture currently selected measure.
    getCurrentMeasure.call(this);

    // 2. Filter data on currently selected measure.
    defineMeasureData.call(this);

    // 3a Set x-domain given currently selected measure.
    setXdomain.call(this);

    // 3b Set x-axis label to current measure.
    setXaxisLabel.call(this);

    // 4a Define precision of measure.
    setXprecision.call(this);

    // 4b Update x-axis reset button when measure changes.
    updateXaxisResetButton.call(this);

    // 4c Update x-axis limit controls to match y-axis domain.
    updateXaxisLimitControls.call(this);
}
