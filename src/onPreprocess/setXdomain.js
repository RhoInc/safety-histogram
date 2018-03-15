export default function setXdomain() {
    if (this.currentMeasure !== this.previousMeasure)
        // new measure
        this.config.x.domain = this.measure_domain;
    else if (this.config.x.domain[0] > this.config.x.domain[1])
        // invalid domain
        this.config.x.domain.reverse();
    else if (this.config.x.domain[0] === this.config.x.domain[1])
        // domain with zero range
        this.config.x.domain = this.config.x.domain
            .map((d,i) => (
                i === 0
                    ? d - d * 0.01
                    : d + d * 0.01
            ));
}
