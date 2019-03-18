export default function maintainBinHighlighting() {
    if (this.highlightedBin)
        this.svg
            .selectAll('.bar')
            .attr('fill-opacity', d => (d.key !== this.highlightedBin ? 0.5 : 1));
}
