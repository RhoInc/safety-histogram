export default function updateBinQuantity() {
    this.controls.Quantity.selectAll('input').property('value', this.config.x.bin);
}
