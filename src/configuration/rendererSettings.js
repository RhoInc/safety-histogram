export default function rendererSettings() {
    return {
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
        start_value: null,
        normal_range: true,
        displayNormalRange: false
    };
}
