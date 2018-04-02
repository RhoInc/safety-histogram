export default function setXprecision() {
    //Calculate range of current measure and the log10 of the range to choose an appropriate precision.
    this.config.x.range = this.config.x.domain[1] - this.config.x.domain[0];
    this.config.x.log10range = Math.log10(this.config.x.range);
    this.config.x.roundedLog10range = Math.round(this.config.x.log10range);
    this.config.x.precision1 = -1 * (this.config.x.roundedLog10range - 1);
    this.config.x.precision2 = -1 * (this.config.x.roundedLog10range - 2);

    //Define the format of the x-axis tick labels and x-domain controls.
    this.config.x.format = this.config.x.log10range > 0.5 ? '1f' : `.${this.config.x.precision1}f`;
    this.config.x.d3_format = d3.format(this.config.x.format);
    this.config.x.formatted_domain = this.config.x.domain.map(d => this.config.x.d3_format(d));

    //Define the bin format: one less than the x-axis format.
    this.config.x.format1 = this.config.x.log10range > 5 ? '1f' : `.${this.config.x.precision2}f`;
    this.config.x.d3_format1 = d3.format(this.config.x.format1);
}
