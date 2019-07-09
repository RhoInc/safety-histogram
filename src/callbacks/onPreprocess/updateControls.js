import updateXAxisResetButton from './updateControls/updateXAxisResetButton';
import updateXAxisLimits from './updateControls/updateXAxisLimits';
import updateBinAlgorithm from './updateControls/updateBinAlgorithm';
import updateBinWidth from './updateControls/updateBinWidth';
import updateBinQuantity from './updateControls/updateBinQuantity';

export default function updateControls() {
    updateXAxisResetButton.call(this);
    updateXAxisLimits.call(this);
    updateBinAlgorithm.call(this);
    updateBinWidth.call(this);
    updateBinQuantity.call(this);
}
