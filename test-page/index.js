d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    function(d,i) {
        if (d.TEST === 'Albumin' && d.STRESN !== '') {
            //d.STRESN = 0; // zero range
            //d.STRESN = i%10; // small number of continous unique values
            //d.STRESN = Math.pow(i%10, 2); // small number of disparate unique values
            //d.STRESN = i%7; // x unique values
        }
        return d;
    },
    function(data) {
        var instance = safetyHistogram(
            '#container', // element
            {
                filters: ['USUBJID'],
                displayNormalRange: true
            } // settings
        );
        instance.init(data);
    }
);
