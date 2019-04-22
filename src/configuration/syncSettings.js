export default function syncSettings(settings) {
    settings.x.column = settings.value_col;
    settings.marks[0].per[0] = settings.value_col;

    if (!settings.normal_range) {
        settings.normal_col_low = null;
        settings.normal_col_high = null;
        settings.displayNormalRange = false;
    }

    //Define default details.
    let defaultDetails = [{ value_col: settings.id_col, label: 'Participant ID' }];
    if (Array.isArray(settings.filters))
        settings.filters.forEach(filter =>
            defaultDetails.push({
                value_col: filter.value_col ? filter.value_col : filter,
                label: filter.label ? filter.label : filter.value_col ? filter.value_col : filter
            })
        );
    defaultDetails.push({ value_col: settings.value_col, label: 'Result' });
    if (settings.normal_col_low)
        defaultDetails.push({ value_col: settings.normal_col_low, label: 'Lower Limit of Normal' });
    if (settings.normal_col_high)
        defaultDetails.push({
            value_col: settings.normal_col_high,
            label: 'Upper Limit of Normal'
        });

    //If [settings.details] is not specified:
    if (!settings.details) settings.details = defaultDetails;
    else {
        //If [settings.details] is specified:
        //Allow user to specify an array of columns or an array of objects with a column property
        //and optionally a column label.
        settings.details.forEach(detail => {
            if (
                defaultDetails
                    .map(d => d.value_col)
                    .indexOf(detail.value_col ? detail.value_col : detail) === -1
            )
                defaultDetails.push({
                    value_col: detail.value_col ? detail.value_col : detail,
                    label: detail.label
                        ? detail.label
                        : detail.value_col
                            ? detail.value_col
                            : detail
                });
        });
        settings.details = defaultDetails;
    }

    return settings;
}
