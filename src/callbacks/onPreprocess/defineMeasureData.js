import calculateStatistics from './defineMeasureData/calculateStatistics';

export default function defineMeasureData() {
    //Filter data on selected measure.
    this.measure.raw = {
        data: this.initial_data.filter(d => d.sh_measure === this.measure.current)
    };
    calculateStatistics.call(this, this.measure.raw);

    //Apply other filters to measure data.
    this.measure.filtered = {
        data: this.measure.raw.data
    };
    this.filters.forEach(filter => {
        this.measure.filtered.data = this.measure.filtered.data.filter(
            d =>
                filter.val === 'All'
                    ? true
                    : Array.isArray(filter.val)
                        ? filter.val.includes(d[filter.col])
                        : filter.val === d[filter.col]
        );
    });
    calculateStatistics.call(this, this.measure.filtered);

    //Update chart config and set chart data to measure data.
    this.config.x.bin = this.measure.filtered.stats.nBins;
    this.raw_data = this.measure.raw.data.slice();
}
