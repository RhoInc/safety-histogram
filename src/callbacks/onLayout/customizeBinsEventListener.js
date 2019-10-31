export default function customizeBinsEventListener() {
    const context = this;

    this.controls.Algorithm.selectAll('.wc-control-label')
        .append('span')
        .classed('algorithm-explanation', true)
        .html(' &#9432')
        .style('cursor', 'pointer')
        .on('click', () => {
            if (this.config.x.bin_algorithm !== 'Custom')
                window.open(
                    `https:// en.wikipedia.org/wiki/Histogram#${this.config.x.bin_algorithm
                        .replace(/ /g, '_')
                        .replace('Freedman-Diaconis', 'Freedman%E2%80%93Diaconis')}`
                );
        });

    this.controls.Quantity.selectAll('input')
        .attr({
            min: 1,
            step: 1
        })
        .on('change', function(d) {
            if (this.value < 1) this.value = 1;
            if (this.value % 1) this.value = Math.round(this.value);
            context.config.x.bin = this.value;
            context.config.x.bin_algorithm = 'Custom';
            context.controls.Algorithm.selectAll('option').property(
                'selected',
                di => di === 'Custom'
            );
            context.draw();
        });

    this.controls.Width.selectAll('input').property('disabled', true);
}
