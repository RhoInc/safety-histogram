d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    function(d,i) {
        return d;
    },
    function(data) {
        var instance = safetyHistogram(
            '#container', // element
            {
                filters: [
                    {value_col: 'SITEID', label: 'Site ID'},
                    {value_col: 'SEX', label: 'Sex'},
                    {value_col: 'RACE', label: 'Race'},
                    {value_col: 'ARM', label: 'Treatment Group'},
                    {value_col: 'USUBJID', label: 'Participant ID'},
                ],
                groups: [
                    {value_col: 'SITEID', label: 'Site ID'},
                    {value_col: 'SEX', label: 'Sex'},
                    {value_col: 'RACE', label: 'Race'},
                    {value_col: 'ARM', label: 'Treatment Group'},
                ],
                displayNormalRange: true,
            } // settings
        );
        instance.init(data);
    }
);
