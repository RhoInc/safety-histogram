import { format } from 'd3';

export default function calculateXPrecision() {
    //define the precision of the x-axis
    this.config.x.precisionFactor = Math.round(
        this.measure[this.measure.domain_state].stats.log10range
    );
    this.config.x.precision = Math.pow(10, this.config.x.precisionFactor);

    //x-axis format
    this.config.x.format =
        this.config.x.precisionFactor > 0
            ? '.0f'
            : `.${Math.abs(this.config.x.precisionFactor) + 1}f`;
    this.config.x.d3format = format(this.config.x.format);

    //one more precision please: bin format
    this.config.x.format1 =
        this.config.x.precisionFactor > 0
            ? '.1f'
            : `.${Math.abs(this.config.x.precisionFactor) + 2}f`;
    this.config.x.d3format1 = format(this.config.x.format1);

    //define the size of the x-axis limit increments
    let step =
        this.measure[this.measure.domain_state].stats.range > 0
            ? Math.abs(this.measure[this.measure.domain_state].stats.range / 15) // non-zero range
            : this.measure[this.measure.domain_state].results[0] !== 0
                ? Math.abs(this.measure[this.measure.domain_state].results[0] / 15) // zero range, non-zero result(s)
                : 1; // zero range, zero result(s)
    if (step < 1) {
        let x10 = 0;
        do {
            step = step * 10;
            ++x10;
        } while (step < 1);
        step = Math.round(step) / Math.pow(10, x10);
    } else step = Math.round(step);
    this.measure.step = step || 1;
}
