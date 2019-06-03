export default function customizeBinsEventListener() {
    const context = this;

    this.controls.Bins.selectAll('input')
        .attr({
            min: 1,
            step: 1
        })
        .on('change', function(d) {
            if (this.value < 1) this.value = 1;
            context.config.x.bin = this.value;
            context.config.x.custom_bin = true;
            context.draw();
        });
}
