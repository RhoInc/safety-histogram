export default function setXprecision() {
    this.config.x.range = this.config.x.domain[1] - this.config.x.domain[0];
    console.log('      range : ' + this.config.x.range);
    this.config.x.log10range = Math.log10(this.config.x.range)
    console.log('log10 range : ' + this.config.x.log10range);
    this.config.x.roundedLog10range = Math.round(this.config.x.log10range);
    console.log('log10 range : ' + this.config.x.roundedLog10range);
    this.config.x.precision = -1*(this.config.x.roundedLog10range - 1);
    console.log('  precision : ' + this.config.x.precision);
    this.config.x.format = this.config.x.log10range > 0
        ? '1f'
        : '.' + -1*(this.config.x.roundedLog10range - 1) + 'f';
    this.config.x.d3_format = d3.format(this.config.x.format);
    this.config.x.formatted_domain = this.config.x.domain
        .map(d => this.config.x.d3_format(d));
}
