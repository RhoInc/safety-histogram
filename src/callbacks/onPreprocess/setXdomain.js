import { extent } from 'd3';

export default function setXdomain() {
    if (this.measure.current !== this.measure.previous)
        this.config.x.domain = this.measure.raw.domain;
    else if (this.config.x.domain[0] > this.config.x.domain[1]) this.config.x.domain.reverse();

    // The x-domain can be in three states:
    // - the extent of all results
    // - user-defined, e.g. narrower to exclude outliers
    //
    // Bin width is calculated with two variables:
    // - the interquartile range
    // - the number of results
    //
    // 1 When the x-domain is set to the extent of all results, the bin width should be calculated
    //  with the unfiltered set of results, regardless of the state of the current filters.
    //
    // 2 Given a user-defined x-domain, the bin width should be calculated with the results that
    //  fall inside the current domain.
    this.measure.domain_state =
        (this.config.x.domain[0] === this.measure.raw.domain[0] &&
            this.config.x.domain[1] === this.measure.raw.domain[1]) ||
        this.measure.previous === undefined
            ? 'raw'
            : 'custom';

    // Set chart data to measure data.
    this.raw_data = this.measure[this.measure.domain_state].data.slice();
}
