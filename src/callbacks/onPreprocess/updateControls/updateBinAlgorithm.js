export default function updateBinAlogrithm() {
    this.controls.Algorithm.selectAll('.algorithm-explanation')
        .style('display', this.config.x.bin_algorithm !== 'Custom' ? null : 'none')
        .attr(
            'title',
            this.config.x.bin_algorithm !== 'Custom'
                ? `View information on ${this.config.x.bin_algorithm}`
                : null
        );
}
