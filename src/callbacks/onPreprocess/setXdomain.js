export default function setXdomain() {
    if (this.measure.current !== this.measure.previous) this.config.x.domain = this.measure.domain;
    else if (this.config.x.domain[0] > this.config.x.domain[1]) this.config.x.domain.reverse();
}
