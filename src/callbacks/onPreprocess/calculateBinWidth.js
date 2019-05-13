import calculateFDBinWidth from './calculateBinWidth/calculateFDBinWidth';
import calculateSSBinWidth from './calculateBinWidth/calculateSSBinWidth';
import { scale, range } from 'd3';

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
        obj.stats.binBoundaries = range(obj.stats.nBins).concat(obj.domain[1]);
    });

    //Update chart config and set chart data to measure data.
    this.config.x.bin = this.measure[this.measure.domain_state].stats.nBins;
}
