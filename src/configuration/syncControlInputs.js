export default function syncControlInputs(controlInputs, settings) {
    //Add filters to default controls.
    if (Array.isArray(settings.filters) && settings.filters.length > 0) {
        let position = controlInputs.findIndex(input => input.label === 'Algorithm');
        settings.filters.forEach(filter => {
            const filterObj = {
                type: 'subsetter',
                value_col: filter.value_col || filter,
                label: filter.label || filter.value_col || filter
            };
            controlInputs.splice(position, 0, filterObj);
            ++position;
        });
    }

    //Remove normal range control.
    if (!settings.normal_range)
        controlInputs.splice(controlInputs.findIndex(input => input.label === 'Normal Range'), 1);

    return controlInputs;
}
