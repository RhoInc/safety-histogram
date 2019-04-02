

## Data structure


## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|`id_col`|_USUBJID_|**character**|a variable that contains IDs for each participant|**Yes**|
|`measure_col`|_TEST_|**character**|a variable that contains the names of each medical sign|**Yes**|
|`unit_col`|_STRESU_|**character**|a variable that contains the units of each medical sign||
|`value_col`|_STRESN_|**numeric**|a variable that contains the results for each medical sign; non-numeric results are removed with a notification thrown to the log|**Yes**|
|`normal_col_high`|_STNRHI_|**numeric**|a variable that contains the upper limit of normal of the medical sign||
|`normal_col_low`|_STNRLO_|**numeric**|a variable that contains the lower limit of normal of the medical sign||
|`filters[]`||**either**|an array of variables and metadata that will appear in the controls as data filters||
|`details[]`||**either**|an array of variables and metadata that will appear in the data listing||