## Overview
![alt tag](https://user-images.githubusercontent.com/31038805/33951165-3e6299dc-dffc-11e7-82c6-0ffd133f42ac.gif)

safety-histogram is a JavaScript library, built using Webcharts ([1](https://github.com/RhoInc/Webcharts), [2](https://github.com/RhoInc/webcharts-wrapper-boilerplate)), that creates an interactive histogram showing the distribution of lab measures, vital signs, and other measures related to safety in clinical trials. A typical chart created with safety-histogram looks like this: 

![Example](https://user-images.githubusercontent.com/31038805/33951418-e515ce48-dffc-11e7-86b7-e43846ea5fcf.gif)

The chart uses [SDTM](http://www.cdisc.org/sdtm) data standards by default, but can be customized to use any data set that contains one record per person per measure. Full details about chart configuration are [here](Configuration).

Users can:
* See the histogram for a single measure of interest
* See the number and percentage of participants displayed in the current view (updates with each user interaction)
* Change the measure of interest, and see an updated chart
* Display metadata when hovering over a bar
* Click a bars in the histogram to show a linked listing of the underlying data
* Filter the histogram for selected criteria, and see an updated chart (optional)
* Show or hide normal ranges for the selected measure (optional)

## Typical Usage

In the simplest case, using a dataset matching all default requirements, the chart can be created with a single line of code.

```javascript
safetyHistogram('#chartLocation', {}).init(data);
```

The code to load a comma-delimited data set and initialize the customized chart, with filters and simple data mappings, looks like this: 

```javascript
const settings =
    {filters:
        [   {value_col: 'VISIT',    label: 'Visit'},
        ,   {value_col: 'SITEID',   label: 'Site ID'},
        ,   {value_col: 'SEX',      label: 'Sex'},
        ,   {value_col: 'RACE',     label: 'Race'}
        ]
    ,start_value: 'POTASSIUM'
    ,details: [
        {value_col: 'USUBJID'     , label: 'Subject ID'},
        {value_col: 'SITEID'      , label: 'Site ID' },
        {value_col: 'SEX'         , label: 'Sex'    },
        {value_col: 'RACE'        , label: 'Race'   },
        {value_col: 'VISIT'       , label: 'Visit'  },
        {value_col: 'DY'          , label: 'Study Day' },    
        {value_col: 'STNRLO'      , label: 'LLN' },
        {value_col: 'STRESN'      , label: 'Result'}, 
        {value_col: 'STNRHI'      , label: 'ULN' },
        {value_col: 'STRESU'      , label: 'Units' }
    };

d3.csv('../data/ADBDS.csv', function(data) {
    safetyHistogram('#safety-histogram .content', settings).init(data);
});
```

Click [here](https://rhoinc.github.io/viz-library/examples/0008-safetyExplorer-default/safety-histogram/) to open an interactive example.

## Examples

- [Safety Histogram with defaults](https://rhoinc.github.io/viz-library/examples/0008-safetyExplorer-default/safety-histogram/)


