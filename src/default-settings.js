const settings = {
    //Addition settings for this template
    value_col: "STRESN",
    measure_col: "TEST",
    unit_col: "STRESU",
    filters: [
        {value_col: "SITE", label: 'Site'},
        {value_col: "VISITN", label: 'Visit'},
        {value_col: "SEX", label: 'Sex'},
        {value_col: "RACE", label: 'Race'}],
    id_col: "USUBJID",
    normal_col_low: "STNRLO",
    normal_col_high: "STNRHI",
    start_value: null,
    rotateX: true,
    missingValues: ["NA",""],

    //Standard webcharts settings
    x:{
        "column":null, //set in syncSettings()
        "label":null, //set in syncSettings()
        "type":"linear",
        "bin":25, 
        "behavior":'flex', 
        "format":'.1f'
    },
    y:{
        "label":"# of Observations",
        "type":"linear",
        "behavior": 'flex',
        "column":"",
        "domain":[0,null]
    },
    marks:[
        {   
            "per":[], //set in syncSettings()
            "type":"bar",
            "summarizeY":"count",
            "summarizeX":"mean",
            "attributes":{"fill-opacity":0.75}
        }
    ],
    "aspect":1.66,
    "max_width":"800"
};

// Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
	settings.x.label = settings.start_value;
	settings.x.column = settings.value_col;
	settings.marks[0].per[0] = settings.value_col;

	return settings;
}

// Map values from settings to control inputs
export function syncControlInputs(settings) {
    var controlInputs = [{
            label: "Measure",
            type: "subsetter",
            value_col: settings.measure_col,
            start: null}]
        .concat(settings.filters.map(function(d) {
            return {
                label: d.label,
                type: "subsetter",
                value_col: d.value_col}; }));

	return controlInputs
}

export default settings
