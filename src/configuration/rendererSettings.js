export default function rendererSettings() {
    return {
        // required variables
        measure_col: 'TEST',
        value_col: 'STRESN',

        // optional variables
        id_col: 'USUBJID',
        unit_col: 'STRESU',
        normal_col_low: 'STNRLO',
        normal_col_high: 'STNRHI',
        filters: null,
        groups: null,
        details: null,

        // miscellaneous settings
        start_value: null,
        normal_range: true,
        displayNormalRange: false,
        bin_algorithm: "Scott's normal reference rule",
        annotate_bin_boundaries: false
    };
}
