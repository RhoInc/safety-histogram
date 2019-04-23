export default function maintainBinHighlighting() {
    this.svg
        .selectAll('.bar')
        .attr(
            'fill-opacity',
            d =>
                this.highlightedBin
                    ? d.key !== this.highlightedBin
                        ? 0.5
                        : 1
                    : this.marks[0].attributes['fill-opacity']
        );
}
