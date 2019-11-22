export default function updateBinAlogrithm() {
    this.controls.Algorithm.selectAll('.sh-algorithm-explanation')
        .classed('sh-hidden', this.config.x.bin_algorithm === 'Custom')
        .attr(
            'title',
            this.config.x.bin_algorithm !== 'Custom'
                ? `Click to view information on ${this.config.x.bin_algorithm}.`
                : null
        );
}
