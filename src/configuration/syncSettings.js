import { set } from 'd3';

export default function syncSettings(settings) {
    settings.x.column = settings.value_col;
    settings.x.bin_algorithm = settings.bin_algorithm;
    settings.marks[0].per[0] = settings.value_col;

    // Handle a string argument to filters.
    if (!(settings.filters instanceof Array))
        settings.filters = typeof settings.filters === 'string' ? [settings.filters] : [];

    // Handle a string argument to groups.
    if (!(settings.groups instanceof Array))
        settings.groups = typeof settings.groups === 'string' ? [settings.groups] : [];

    // stratification
    const defaultGroup = { value_col: 'sh_none', label: 'None' };
    if (!(settings.groups instanceof Array && settings.groups.length)) {
        settings.groups = [defaultGroup];
        if (settings.group_by)
            settings.groups.push({ value_col: settings.group_by, label: settings.group_by });
    } else
        settings.groups = [defaultGroup].concat(
            settings.groups.map(group => {
                return {
                    value_col: group.value_col || group,
                    label: group.label || group.value_col || group
                };
            })
        );

    // Remove duplicate values.
    settings.groups = set(settings.groups.map(group => group.value_col))
        .values()
        .map(value => {
            return {
                value_col: value,
                label: settings.groups.find(group => group.value_col === value).label
            };
        });
    settings.draw_multiples = settings.groups.length > 1;

    // Set initial group-by variable.
    settings.group_by =
        settings.group_by && settings.groups.some(group => group.value_col === settings.group_by)
            ? settings.group_by
            : settings.groups.length > 1
            ? settings.groups[1].value_col
            : defaultGroup.value_col;
    settings.group_label = settings.group_by
        ? settings.groups.find(group => group.value_col === settings.group_by).label
        : settings.groups.length > 1
        ? settings.groups[1].label
        : defaultGroup.label;

    // handle a string argument to details
    if (!(settings.details instanceof Array))
        settings.details = typeof settings.details === 'string' ? [settings.details] : [];

    // Define default details.
    let defaultDetails = [{ value_col: settings.id_col, label: 'Participant ID' }];
    if (Array.isArray(settings.filters))
        settings.filters
            .filter(filter => filter.value_col !== settings.id_col)
            .forEach(filter =>
                defaultDetails.push({
                    value_col: filter.value_col ? filter.value_col : filter,
                    label: filter.label
                        ? filter.label
                        : filter.value_col
                        ? filter.value_col
                        : filter
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

    // If [settings.details] is not specified:
    if (!settings.details) settings.details = defaultDetails;
    else {
        // If [settings.details] is specified:
        // Allow user to specify an array of columns or an array of objects with a column property
        // and optionally a column label.
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

    // Maintain backward compatibility for displayNormalRange.
    if (settings.hasOwnProperty('displayNormalRange'))
        settings.display_normal_range = settings.displayNormalRange;

    // Update normal range settings if normal_range is set to false.
    if (!settings.normal_range) {
        settings.normal_col_low = null;
        settings.normal_col_high = null;
        settings.display_normal_range = false;
    }

    return settings;
}
