export default function syncControlInputs(controlInputs, settings) {
    //Sync measure filter.
    const measureFilter = controlInputs.find(input => input.label === 'Measure');
    measureFilter.value_col = settings.measure_col;
    measureFilter.start = settings.start_value;

    //Add filters to default controls.
    if (Array.isArray(settings.filters) && settings.filters.length > 0)
        settings.filters.forEach(filter => {
            controlInputs.push({
                type: 'subsetter',
                value_col: filter.value_col || filter,
                label: filter.label || filter.value_col || filter
            });
        });

    return controlInputs;
}
