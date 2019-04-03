d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    function(d,i) {
        if (d.TEST === 'Albumin' && d.STRESN !== '') {
            d.STRESN = 100; // zero range
            d.STRESN = Math.pow(i%10, 2);
            d.STRESN = i%10; // small number of unique values
        }
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
