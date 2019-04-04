d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    function(d,i) {
        if (d.TEST === 'Albumin' && d.STRESN !== '') {
            d.STRESN = 10000; // zero range
            d.STRESN = Math.pow(i%10, 2); // two unique values
            d.STRESN = i%10; // small number of unique values
        }
        return d;
    },
    function(data) {
        var instance = safetyHistogram(
            '#container', // element
            {
                displayNormalRange: true
            } // settings
        );
        instance.init(data);
    }
);
