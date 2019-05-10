export default function removeXAxisTicks() {
    if (this.measure.domain_state !== 'custom') this.svg.selectAll('.x.axis .tick').remove();
}
