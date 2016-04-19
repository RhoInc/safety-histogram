const value_col = "STRESN";
const settings = {
    //Addition settings for this template
    id_col: "USUBJID",
    time_col: "VISITN",
    measure_col: "TEST",
    value_col: value_col,
    unit_col: "STRESU",
    normal_col_low: "STNRLO",
    normal_col_high: "STNRHI",
    start_value: null,
    rotateX: true,
    missingValues: ["NA",""],
    //Standard webcharts settings
    x:{
        "label":null,
        "type":"linear",
        "column":value_col,
        "bin":25, 
        behavior:'flex', 
        "format":'.1f'
    },
    y:{
        "label":"# of Measures",
        "type":"linear",
        "behavior": 'flex',
        "column":"",
        "domain":[0,null]
    },
    marks:[
        {
            "per":[value_col],
            "type":"bar",
            "summarizeY":"count",
            "summarizeX":"mean",
            "attributes":{"fill-opacity":0.75}
        }
    ],
    "legend":{
        "mark":"square",
        "label":"cohort"
    },
    "aspect":1.66,
    "max_width":"800"
};

export const controlInputs = [ 
    {label: "Lab Test", type: "subsetter", value_col: "TEST", start: null},
    {label: "Sex", type: "subsetter", value_col: "SEX"},
    {label: "Race", type: "subsetter", value_col: "RACE"},
    {label: "Visit", type: "subsetter", value_col: "VISIT"}
];

export const tableSettings = {
    
};

export default settings
