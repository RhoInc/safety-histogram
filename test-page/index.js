d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    function(d,i) {
        return d;
    },
    function(data) {
        var instance = safetyHistogram(
            '#container', // element
            {
            } // settings
        );
        instance.init(data);
    }
);
    const element = 'body';
    const settings = {
        measure_col: 'PARAM',
        value_col: 'AVAL',
        id_col: 'USUBJID',
        normal_col_low: 'ANRLO',
        normal_col_high: 'ANRHI',
        filters: [
            {value_col: 'SEX'    , label: 'Sex'},
            {value_col: 'RACE'   , label: 'Race'},
            {value_col: 'ARM'    , label: 'Arm'},
            {value_col: 'AVISIT' , label: 'Visit'},
            {value_col: 'SITE'   , label: 'Site'},
        ],
    };

    d3.csv(
        'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/adam/advs.csv',
        function(data) {
            safetyHistogram(element, settings).init(data);
        }
    );
