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
                    {value_col: 'ARM', label: 'Treatment Group'}
                ],
                displayNormalRange: true
            } // settings
        );
        instance.init(data);
    }
);
