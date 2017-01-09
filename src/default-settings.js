const config = {
  //Default template settings
    value_col: 'STRESN',
    measure_col: 'TEST',
    unit_col: 'STRESU',
    normal_col_low: 'STNRLO',
    normal_col_high: 'STNRHI',
    id_col: 'USUBJID',
    filters: [],
    detail_cols: null,
    start_value: null,
    rotateX: true,
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
    'aspect':1.66,
    'max_width':'800'
};

//Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    settings.x.label = settings.start_value;
    settings.x.column = settings.value_col;
    settings.marks[0].per[0] = settings.value_col;

  //Set [ settings.detail_cols ] to columns specified in default template settings.
    if (settings.detail_cols === null) {
        settings.detail_cols = [settings.id_col];
        settings.filters.forEach(d => settings.detail_cols.push(d.value_col));
        settings.detail_cols.push
            (settings.measure_col
            ,settings.value_col
            ,settings.unit_col
            ,settings.normal_col_low
            ,settings.normal_col_high);
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

export default config
