export default function removeXAxisTicks() {
    if (this.config.annotate_bin_boundaries) this.svg.selectAll('.x.axis .tick').remove();
}
