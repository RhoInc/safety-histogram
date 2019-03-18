export default function addVariables() {
    this.raw_data.forEach(d => {
        d[this.config.measure_col] = d[this.config.measure_col].trim();
    });
}
