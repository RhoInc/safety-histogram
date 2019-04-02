d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    function(d) {
        if (d.TEST === 'Albumin' && d.STRESN !== '')
            d.STRESN = '100';
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
