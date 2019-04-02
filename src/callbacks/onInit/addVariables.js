export default function addVariables() {
    this.raw_data.forEach(d => {
        //Concatenate unit to measure if provided.
        d[this.config.measure_col] = d[this.config.measure_col].trim();
        d.sh_measure = d.hasOwnProperty(this.config.unit_col)
            ? `${d[this.config.measure_col]} (${d[this.config.unit_col]})`
            : d[this.config.measure_col];
    });
}
