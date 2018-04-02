import countParticipants from './onInit/countParticipants';
import cleanData from './onInit/cleanData';
import addVariables from './onInit/addVariables';
import checkFilters from './onInit/checkFilters';
import setInitialMeasure from './onInit/setInitialMeasure';

export default function onInit() {
    this.super_raw_data = this.raw_data;

    // 1. Count total participants prior to data cleaning.
    countParticipants.call(this);

    // 2. Drop missing values and remove measures with any non-numeric results.
    cleanData.call(this);

    // 3a Define additional variables.
    addVariables.call(this);

    // 3b Remove filters for nonexistent or single-level variables.
    checkFilters.call(this);

    // 3c Choose the start value for the Test filter
    setInitialMeasure.call(this);
}
