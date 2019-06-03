export default function updateBinWidth() {
    this.controls.Width.selectAll('input').property(
        'value',
        this.config.x.d3format1(this.config.x.bin_width)
    );
}
