export default function updateXAxisResetButton() {
    //Update tooltip of x-axis domain reset button.
    if (this.measure.current !== this.measure.previous) {
        this.controls.reset.container.attr(
            'title',
            'Initial Limits: [' +
                this.config.x.d3format1(this.config.x.domain[0]) +
                ' - ' +
                this.config.x.d3format1(this.config.x.domain[1]) +
                ']'
        );
    }
}
