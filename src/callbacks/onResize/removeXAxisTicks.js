export default function removeXAxisTicks() {
    this.svg.selectAll('.x.axis .tick').remove();
}
