import calculateFDBinWidth from './calculateBinWidth/calculateFDBinWidth';
import calculateSSBinWidth from './calculateBinWidth/calculateSSBinWidth';
import { layout, range } from 'd3';

export default function calcualteBinWidth() {
    ['raw', 'filtered', 'custom'].forEach(property => {
        const obj = this.measure[property];

        //Calculate bin width.
        if (true) {
            //Calculate bin width with Freedman-Diaconis algorithm.
            calculateFDBinWidth.call(this, obj);
            obj.stats.nBins =
                obj.stats.FDBins < obj.stats.nUnique ? obj.stats.FDBins : obj.stats.nUnique;
        } else {
            //Calculate bin width with Shimazaki-Shinomoto algorithm.
            calculateSSBinWidth.call(this, obj);
            obj.stats.nBins =
                obj.stats.SSBins < obj.stats.nUnique ? obj.stats.SSBins : obj.stats.nUnique;
        }

        //Calculate bin width.
        obj.stats.binWidth = obj.stats.range / obj.stats.nBins;
        obj.stats.bins = property !== 'custom'
            ? layout.histogram().bins(obj.stats.nBins)(obj.results)
            : layout.histogram().bins(range(this.config.x.domain[0], this.config.x.domain[1], obj.stats.binWidth).concat(this.config.x.domain[1]))(obj.results);;
    });

    //Update chart config and set chart data to measure data.
    this.config.x.bin = this.measure[this.measure.domain_state].stats.nBins;
}
