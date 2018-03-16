export default function setXprecision() {
    //calculate range of current measure
    this.config.x.range = this.config.x.domain[1] - this.config.x.domain[0];
    this.config.x.log10range = Math.log10(this.config.x.range);
    this.config.x.roundedLog10range = Math.round(this.config.x.log10range);
    this.config.x.precision = -1 * (this.config.x.roundedLog10range - 1);

    //axis format
    this.config.x.format =
        this.config.x.log10range > 0.5
            ? '1f'
            : '.' + -1 * (this.config.x.roundedLog10range - 1) + 'f';
    this.config.x.d3_format = d3.format(this.config.x.format);

    //bin format - 1 less than axis format
    this.config.x.format1 =
        this.config.x.log10range > 5
            ? '1f'
            : '.' + -1 * (this.config.x.roundedLog10range - 2) + 'f';
    this.config.x.d3_format1 = d3.format(this.config.x.format1);

    //format domain to print in Limit controls
    this.config.x.formatted_domain = this.config.x.domain.map(d => this.config.x.d3_format(d));
}
