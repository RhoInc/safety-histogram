import countParticipants from './onInit/countParticipants';
import cleanData from './onInit/cleanData';
import addVariables from './onInit/addVariables';
import defineSets from './onInit/defineSets';
import checkControls from './onInit/checkControls';

export default function onInit() {
    // 1. Count total participants prior to data cleaning.
    countParticipants.call(this);

    // 2. Drop missing values and remove measures with any non-numeric results.
    cleanData.call(this);

    // 3. Define additional variables.
    addVariables.call(this);

    // 4. Define sets.
    defineSets.call(this);

    // 5. Check controls.
    checkControls.call(this);
}
