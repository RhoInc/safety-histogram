# Safety Histogram
![alt tag](https://user-images.githubusercontent.com/31038805/33951165-3e6299dc-dffc-11e7-82c6-0ffd133f42ac.gif)

## Overview
Safety Histogram is a JavaScript library, built with Webcharts ([1](https://github.com/RhoInc/Webcharts), [2](https://github.com/RhoInc/webcharts-wrapper-boilerplate)), that creates an interactive histogram showing the distribution of lab measures, vital signs, and other measures related to safety in clinical trials.
A typical chart created with safety-histogram looks like this: 

![Example](https://user-images.githubusercontent.com/31038805/33951675-9edaeb42-dffd-11e7-8bed-71988d7092a2.gif)

The chart uses [SDTM](http://www.cdisc.org/sdtm) data standards by default, but can be customized to use any data set that contains one record per participant per measure.
Full details about chart configuration are [here](Configuration).

Users can:
* See the histogram for a single measure of interest
* See the number and percentage of participants displayed in the current view (updates with each user interaction)
* Change the measure of interest, and see an updated chart
* Display metadata when hovering over a bar
* Click a bar in the histogram to show a linked listing of the underlying data
* Filter the histogram for selected criteria, and see an updated chart (optional)
* Show or hide normal ranges for the selected measure (optional)

## Typical Usage
In the simplest case, using a dataset matching all default requirements, the chart can be created with a single line of code.

```javascript
    safetyHistogram(element, settings).init(data);
```

The code to load a comma-delimited dataset and define a chart tailored to [ADaM](https://www.cdisc.org/standards/foundational/adam) data looks like this:

```javascript
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
```

Click [here](https://rhoinc.github.io/safety-histogram/test-page/) to open an interactive example.

## Links 
- [Interactive Example](https://rhoinc.github.io/safety-histogram/test-page/)
- [Configuration](https://github.com/RhoInc/safety-histogram/wiki/Configuration)
- [API](https://github.com/RhoInc/safety-histogram/wiki/API)
- [Technical Documentation](https://github.com/RhoInc/safety-histogram/wiki/Technical-Documentation)
- [Data Guidelines](https://github.com/RhoInc/safety-histogram/wiki/Data-Guidelines)
