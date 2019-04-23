import insertGrouping from './groupControls/insertGrouping';

export default function groupControls() {
    //Group x-axis controls.
    insertGrouping.call(this, '.x-axis', 'X-axis Limits');

    //Group filters.
    if (this.filters.length > 1) insertGrouping.call(this, '.subsetter:not(#measure)', 'Filters');
}
