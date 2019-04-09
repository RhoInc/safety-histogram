# Safety Histogram
[![Safety Histogram animation](https://user-images.githubusercontent.com/5428548/55808856-e722b200-5ab2-11e9-9223-de22e2719035.gif)](https://rhoinc.github.io/safety-histogram/test-page/)

## Overview
Safety Histogram is a JavaScript library built with Webcharts ([1](https://github.com/RhoInc/Webcharts), [2](https://github.com/RhoInc/webcharts-wrapper-boilerplate)) that creates an interactive histogram plotting the distribution of lab measures, vital signs, and other measures related to safety in clinical trials.
A typical chart created with safety-histogram looks like this:

![Safety Histogram image](https://user-images.githubusercontent.com/5428548/55808876-f144b080-5ab2-11e9-9354-fe7898ee91f6.PNG)

By default the chart expects [SDTM](http://www.cdisc.org/sdtm)-structured data, but can be configured for any dataset with one record per measurement.
View full chart configuration details [here](https://github.com/RhoInc/safety-histogram/wiki/Configuration).

Users can view a histogram of each measure in the data, update the x-axis limits, toggle display of the normal range, and click the chart to view the raw data.
View full chart functionality [here](https://github.com/RhoInc/safety-histogram/wiki/Technical-Documentation).

## Typical Usage
In the simplest case, the chart can be created with a single line of code provided the input dataset meets the [default requirements](https://github.com/RhoInc/safety-histogram/wiki/Data-Guidelines):

```javascript
    safetyHistogram().init(data);
```

Alternatively, the chart can be configured for a different data standard, such as for [ADaM](https://www.cdisc.org/standards/foundational/adam) in the example below:

```javascript
    const element = 'body'; // element in which to draw the chart
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
    }; // custom chart settings

    d3.csv(
        'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/adam/advs.csv', // data file location
        function(data) {
            safetyHistogram(element, settings).init(data);
        } // callback function in which the chart is created
    );
```

Click [here](https://rhoinc.github.io/safety-histogram/test-page/) to open an interactive example.

## Links 
- [Interactive Example](https://rhoinc.github.io/safety-histogram/test-page/)
- [Wiki](https://github.com/RhoInc/safety-histogram/wiki)
- [API](https://github.com/RhoInc/safety-histogram/wiki/API)
- [Configuration](https://github.com/RhoInc/safety-histogram/wiki/Configuration)
- [Data Guidelines](https://github.com/RhoInc/safety-histogram/wiki/Data-Guidelines)
- [Technical Documentation](https://github.com/RhoInc/safety-histogram/wiki/Technical-Documentation)
