const defaultSettings = {
  //Default template settings
    value_col: 'STRESN',
    measure_col: 'TEST',
    unit_col: 'STRESU',
    normal_col_low: 'STNRLO',
    normal_col_high: 'STNRHI',
    id_col: 'USUBJID',
    filters: null,
    details: null,
    start_value: null,
    missingValues: ['','NA','N/A'],

  //Standard webcharts settings
    x:{
        'column':null, // set in syncSettings()
        'label':null, // set in syncSettings()
        'type':'linear',
        'bin':25,
        'behavior':'flex',
        'format':'.1f'
    },
    y:{
        'label':'# of Observations',
        'type':'linear',
        'behavior': 'flex',
        'column':'',
        'domain':[0,null]
    },
    marks:[
        {
            'per':[], // set in syncSettings()
            'type':'bar',
            'summarizeY':'count',
            'summarizeX':'mean',
            'attributes':{'fill-opacity':0.75}
        }
    ],
    aspect: 3
};

//Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    settings.x.label = settings.start_value;
    settings.x.column = settings.value_col;
    settings.marks[0].per[0] = settings.value_col;

  //Define default details.
    let defaultDetails = [{value_col: settings.id_col, label: 'Subject Identifier'}];
    if (settings.filters)
        settings.filters.forEach(d => defaultDetails.push(
            {value_col: d.value_col ? d.value_col : d
            ,label: d.label ? d.label : d.value_col ? d.value_col : d}));
    defaultDetails.push({value_col: settings.value_col, label: 'Result'});
    if (settings.normal_col_low)
        defaultDetails.push({value_col: settings.normal_col_low, label: 'Lower Limit of Normal'});
    if (settings.normal_col_high)
        defaultDetails.push({value_col: settings.normal_col_high, label: 'Upper Limit of Normal'});

  //If [settings.details] is not specified:
    if (!settings.details)
        settings.details = defaultDetails;
  //If [settings.details] is specified:
    else {
      //Allow user to specify an array of columns or an array of objects with a column property
      //and optionally a column label.
        settings.details = settings.details
            .map(d => {
                return {
                    value_col: d.value_col ? d.value_col : d,
                    label: d.label ? d.label : d.value_col ? d.value_col : d}; });

      //Add default details to settings.details.
        defaultDetails
            .reverse()
            .forEach(defaultDetail => {
                if (settings.details.map(d => d.value_col).indexOf(defaultDetail.value_col) === -1)
                    settings.details.unshift(defaultDetail);
            });
    }

    return settings;
}

//Map values from settings to control inputs
export function syncControlInputs(settings) {
    var measureFilter =
        {type: 'subsetter'
        ,value_col: settings.measure_col
        ,label: 'Measure'
        ,start: null};

    if (settings.filters && settings.filters.length > 0) {
        var otherFilters = settings.filters
            .map(d => {
                return {
                    type: 'subsetter',
                    value_col: d.value_col,
                    label: (d.label && /^\s*$/.test(d.label) === false) ?
                        d.label :
                        d.value_col}; });
        return [measureFilter].concat(otherFilters);
    } else
        return [measureFilter];
}

export default defaultSettings;
