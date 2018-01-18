import { set } from 'd3';
import getValType from './util/getValType';

export default function onInit() {
    let context = this;
    let config = this.config;

    this.super_raw_data = this.raw_data;
    //Remove filters whose [ value_col ] does not appear in the data.
    const columns = d3.keys(this.raw_data[0]);
    this.controls.config.inputs = this.controls.config.inputs.filter(function(d) {
        return columns.indexOf(d.value_col) > -1 || !!d.option;
    });

    //Remove whitespace from measure column values.
    this.raw_data.forEach(e => (e[config.measure_col] = e[config.measure_col].trim()));

    //Drop missing values.
    this.populationCount = set(this.raw_data.map(d => d[config.id_col])).values().length;
    this.raw_data = this.raw_data.filter(f => {
        return config.missingValues.indexOf(f[config.value_col]) === -1;
    });

    //Remove measures with any non-numeric results.
    const allMeasures = set(this.raw_data.map(m => m[config.measure_col])).values(),
        catMeasures = allMeasures.filter(measure => {
            const allObservations = this.raw_data
                    .filter(d => d[config.measure_col] === measure)
                    .map(d => d[config.value_col]),
                numericObservations = allObservations.filter(d => /^-?[0-9.]+$/.test(d));

            return numericObservations.length < allObservations.length;
        }),
        conMeasures = allMeasures.filter(measure => catMeasures.indexOf(measure) === -1);

    if (catMeasures.length)
        console.warn(
            `${catMeasures.length} non-numeric endpoint${
                catMeasures.length > 1 ? 's have' : ' has'
            } been removed: ${catMeasures.join(', ')}`
        );

    this.raw_data = this.raw_data.filter(d => catMeasures.indexOf(d[config.measure_col]) === -1);

    // Remove filters for variables with 0 or 1 levels
    var chart = this;

    this.controls.config.inputs = this.controls.config.inputs.filter(function(d) {
        if (d.type != 'subsetter') {
            return true;
        } else {
            var levels = d3.set(chart.raw_data.map(f => f[d.value_col])).values();
            if (levels.length < 2) {
                console.warn(
                    d.value_col + ' filter not shown since the variable has less than 2 levels'
                );
            }
            return levels.length >= 2;
        }
    });

    //Define initial measure.
    this.controls.config.inputs[0].start = this.config.start_value || conMeasures[0];
}
