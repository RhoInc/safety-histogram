export default function rendererSettings() {
    return {
        //required variables
        measure_col: 'TEST',
        value_col: 'STRESN',

        //optional variables
        unit_col: 'STRESU',
        normal_col_low: 'STNRLO',
        normal_col_high: 'STNRHI',
        id_col: 'USUBJID',
        filters: null,
        details: null,

        //miscellaneous settings
        start_value: null,
        normal_range: true,
        displayNormalRange: false
    };
}
