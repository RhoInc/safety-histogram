export const rendererSpecificSettings = {
    //required variables
    id_col: 'USUBJID',
    measure_col: 'TEST',
    unit_col: 'STRESU',
    value_col: 'STRESN',
    normal_col_low: 'STNRLO',
    normal_col_high: 'STNRHI',

    //optional variables
    filters: null,
    details: null,

    //miscellaneous settings
    missingValues: ['', 'NA', 'N/A'],
    start_value: null,
    normal_range: true
};

export const webchartsSettings = {
    x: {
        column: null, // set in syncSettings()
        label: null, // set in syncSettings()
        type: 'linear',
        bin: 25,
        behavior: 'flex',
        format: '.1f'
    },
    y: {
        label: '# of Observations',
        type: 'linear',
        behavior: 'flex',
        column: '',
        domain: [0, null]
    },
    marks: [
        {
            per: [], // set in syncSettings()
            type: 'bar',
            summarizeY: 'count',
            summarizeX: 'mean',
            attributes: { 'fill-opacity': 0.75 }
        }
    ],
    aspect: 3,
    displayNormalRange: false
};

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

//Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    settings.x.label = settings.start_value;
    settings.x.column = settings.value_col;
    settings.marks[0].per[0] = settings.value_col;

    if (!settings.normal_range) {
        settings.normal_col_low = null;
        settings.normal_col_high = null;
    }

    //Define default details.
    let defaultDetails = [{ value_col: settings.id_col, label: 'Subject Identifier' }];
    if (settings.filters)
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
                        : detail.value_col ? detail.value_col : detail
                });
        });
        settings.details = defaultDetails;
    }

    return settings;
}

//Map values from settings to control inputs
export function syncControlInputs(settings) {
    const defaultControls = [
        {
            type: 'subsetter',
            label: 'Measure',
            value_col: settings.measure_col,
            start: settings.start_value
        },
        {
            type: 'checkbox',
            label: 'Normal Range',
            option: 'displayNormalRange'
        }
    ];

    if (settings.filters && settings.filters.length > 0) {
        let otherFilters = settings.filters.map(filter => {
            filter = {
                type: 'subsetter',
                value_col: filter.value_col ? filter.value_col : filter,
                label: filter.label ? filter.label : filter.value_col ? filter.value_col : filter
            };
            return filter;
        });
        return defaultControls.concat(otherFilters);
    } else return defaultControls;
}
