import updateMeasureFilter from './checkControls/updateMeasureFilter';
import removeFilters from './checkControls/removeFilters';

export default function checkControls() {
    updateMeasureFilter.call(this);
    removeFilters.call(this);
}
