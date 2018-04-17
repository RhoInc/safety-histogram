The most straightforward way to customize the Safety Histogram is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the Safety Histogram is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/safety-outlier-explorer/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the Safety Histogram to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each safety-histogram setting as of version 2.2.0.

## settings.id_col
`string`

a variable that contains IDs for each participant

**default:** `"USUBJID"`



## settings.measure_col
`string`

a variable that contains the names of each medical sign

**default:** `"TEST"`



## settings.unit_col
`string`

a variable that contains the units of each medical sign

**default:** `"STRESU"`



## settings.value_col
`string`

a variable that contains the results for each medical sign; non-numeric results are removed with a notification thrown to the log

**default:** `"STRESN"`



## settings.normal_col_high
`string`

a variable that contains the upper limit of normal of the medical sign

**default:** `"STNRHI"`



## settings.normal_col_low
`string`

a variable that contains the lower limit of normal of the medical sign

**default:** `"STNRLO"`



## settings.filters
`array`

an array of variables and metadata that will appear in the controls as data filters

**default:** none

### settings.filters[].label
`string`

a description of the variable

**default:** none

### settings.filters[].value_col
`string`

the name of the variable

**default:** none



## settings.details
`array`

an array of variables and metadata that will appear in the data listing

**default:** none

### settings.details[].label
`string`

a description of the variable

**default:** none

### settings.details[].value_col
`string`

the name of the variable

**default:** none



## settings.start_value
`string`

the name of the initially displayed medical sign; defaults to the first measure in the data

**default:** none



## settings.normal_range
`boolean`

a boolean that dictates whether the normal range control will be generated

**default:** `true`



## settings.displayNormalRange
`boolean`

a boolean that dictates whether the normal range will be displayed initially

**default:** `false`

# Webcharts settings
The object below contains each Webcharts setting as of version 2.2.0.

```
{    x: {        type: 'linear',        column: null, // set in syncSettings()        label: null, // set in syncSettings()        domain: [null, null], // set in preprocess callback        format: null, // set in preprocess callback        bin: 25    },    y: {        type: 'linear',        column: null,        label: '# of Observations',        domain: [0, null],        format: '1d',        behavior: 'flex'    },    marks: [        {            per: [], // set in syncSettings()            type: 'bar',            summarizeY: 'count',            summarizeX: 'mean',            attributes: { 'fill-opacity': 0.75 }        }    ],    aspect: 3}
```