import { set, extent } from 'd3';

export default function defineMeasureData() {
    // Filter data on selected measure.
    this.measure.raw = {
        data: this.initial_data.filter(d => d.sh_measure === this.measure.current)
    };

    // Apply other filters to measure data.
    this.measure.filtered = {
        data: this.measure.raw.data
    };
    this.filters.forEach(filter => {
        this.measure.filtered.data = this.measure.filtered.data.filter(d =>
            filter.val === 'All'
                ? true
                : Array.isArray(filter.val)
                ? filter.val.includes(d[filter.col])
                : filter.val === d[filter.col]
        );
    });

    // Filter results on current x-domain.
    if (this.measure.current !== this.measure.previous)
        this.config.x.domain = extent(this.measure.raw.data.map(d => +d[this.config.value_col]));
    this.measure.custom = {
        data: this.measure.raw.data.filter(
            d =>
                this.config.x.domain[0] <= +d[this.config.value_col] &&
                +d[this.config.value_col] <= this.config.x.domain[1]
        )
    };

    // Define arrays of results, unique results, and extent of results.
    ['raw', 'custom', 'filtered'].forEach(property => {
        const obj = this.measure[property];

        // Define array of all and unique results.
        obj.results = obj.data.map(d => +d[this.config.value_col]).sort((a, b) => a - b);
        obj.uniqueResults = set(obj.results).values();

        // Calculate extent of data.
        obj.domain = property !== 'custom' ? extent(obj.results) : this.config.x.domain;
    });
}
