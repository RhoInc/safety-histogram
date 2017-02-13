import { set } from 'd3';
import getValType from './util/getValType';

export default function onInit() {
    let context = this;
    let config = this.config;

  //Remove filters whose [ value_col ] does not appear in the data.
    const columns = d3.keys(this.raw_data[0]);
    this.controls.config.inputs = this.controls.config.inputs
        .filter(function(d) {
            return columns.indexOf(d.value_col) > -1 || !!d.option; });
    this.listing.config.cols = this.listing.config.cols
        .filter(function(d) {
            return columns.indexOf(d) > -1; });

  //Remove whitespace from measure column values.
    this.raw_data.forEach(e => e[config.measure_col] = e[config.measure_col].trim() );

  //Drop missing values.
    this.populationCount = set(
            this.raw_data
                .map(d => d[config.id_col]))
        .values()
        .length;
    this.raw_data = this.raw_data.filter(f => {
        return config.missingValues.indexOf(f[config.value_col]) === -1;
    });

  //Remove measures with any non-numeric results.
    const allMeasures = set(this.raw_data.map(m => m[config.measure_col]))
        .values();
    const catMeasures = allMeasures
        .filter(measure => {
            const measureData = this.raw_data
                .filter(d => d[config.measure_col] === measure);
            const measureType = getValType(measureData, config.value_col);

            return measureType === 'categorical';
        });
    const conMeasures = allMeasures
        .filter(measure => catMeasures.indexOf(measure) === -1);
    if (catMeasures.length)
        console.warn(`${catMeasures.length} non-numeric endpoints have been removed: ${catMeasures.join(', ')}`);
    this.raw_data = this.raw_data
        .filter(d => catMeasures.indexOf(d[config.measure_col]) === -1);

  //Define initial measure.
    this.controls.config.inputs[0].start = this.config.start_value || conMeasures[0]; 
};
