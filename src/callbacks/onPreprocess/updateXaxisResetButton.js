export default function updateXaxisResetButton() {
    //Update tooltip of x-axis domain reset button.
    if (this.currentMeasure !== this.previousMeasure)
        this.controls.wrap
            .selectAll('.x-axis')
            .property(
                'title',
                'Initial Limits: [' +
                    this.config.x.domain[0] +
                    ' - ' +
                    this.config.x.domain[1] +
                    ']'
            );
}
