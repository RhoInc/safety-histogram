export default function rendererSettings() {
    return {
        // data mappings
        measure_col: 'TEST', // required
        value_col: 'STRESN', // required
        id_col: 'USUBJID', // optional
        unit_col: 'STRESU', // optional
        normal_col_low: 'STNRLO', // optional
        normal_col_high: 'STNRHI', // optional

        // arrays of dataset variables
        filters: null,
        groups: null,
        details: null,

        // miscellaneous settings
        start_value: null, // initial measure
        bin_algorithm: "Scott's normal reference rule", // initial binning algorithm
        normal_range: true, // controls whether the normal range control displays
        display_normal_range: false, // controls whether the normal range displays initially
        annotate_bin_boundaries: false, // annotate bin boundaries or standard display linear x-axis
        test_normality: false, // test normality of distribution of results
        group_by: 'sh_none', // initial stratification variable
        compare_distributions: false // compare distribution of full set of results with distribution of group subsets of results
    };
}
