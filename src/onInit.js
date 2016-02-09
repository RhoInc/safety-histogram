import { dataOps } from 'webcharts';
import { set } from 'd3';

export default function onInit(){
    const config = this.config;
    const allMeasures = set(this.raw_data.map(m => m[config.measure_col])).values();

    // "All" variable for non-grouped comparisons
    this.raw_data.forEach(e => e[config.measure_col] = e[config.measure_col].trim() );
    
    //Drop missing values
    this.raw_data = this.raw_data.filter(f => {
        return config.missingValues.indexOf(f[config.value_col]) === -1;
    })

    //warning for non-numeric endpoints
    var catMeasures = allMeasures
        .filter(f => {
            var measureVals = this.raw_data
                .filter(d => d[config.measure_col] === f);

            return dataOps.getValType(measureVals, config.value_col) !== "continuous";
        });
    if(catMeasures.length){
        console.warn(catMeasures.length + " non-numeric endpoints have been removed: "+catMeasures.join(", "))    
    }
    
    //delete non-numeric endpoints
    var numMeasures = allMeasures
        .filter(f => {
            var measureVals = this.raw_data
                .filter(d => d[config.measure_col] === f );

            return dataOps.getValType(measureVals, config.value_col) === "continuous";
        });

    this.raw_data = this.raw_data.filter(f => numMeasures.indexOf(f[config.measure_col]) > -1 );

    //Choose the start value for the Test filter
    this.controls.config.inputs[0].start = this.config.start_value || numMeasures[0]; 

};