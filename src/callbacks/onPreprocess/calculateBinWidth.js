import calculateSquareRootBinWidth from './calculateBinWidth/calculateSquareRootBinWidth';
import calculateSturgesBinWidth from './calculateBinWidth/calculateSturgesBinWidth';
import calculateRiceBinWidth from './calculateBinWidth/calculateRiceBinWidth';
// import calculateDoaneBinWidth from './calculateBinWidth/calculateDoaneBinWidth';
import calculateScottBinWidth from './calculateBinWidth/calculateScottBinWidth';
import calculateFDBinWidth from './calculateBinWidth/calculateFDBinWidth';
import calculateSSBinWidth from './calculateBinWidth/calculateSSBinWidth';
import { scale, range } from 'd3';

export default function calcualteBinWidth() {
    ['raw', 'custom'].forEach(property => {
        const obj = this.measure[property];

        // Calculate bin width with the selected algorithm.
        switch (this.config.x.bin_algorithm) {
            case 'Square-root choice':
                calculateSquareRootBinWidth.call(this, obj);
                obj.stats.nBins =
                    obj.stats.SquareRootBins < obj.stats.nUnique
                        ? obj.stats.SquareRootBins
                        : obj.stats.nUnique;
                break;
            case "Sturges' formula":
                calculateSturgesBinWidth.call(this, obj);
                obj.stats.nBins =
                    obj.stats.SturgesBins < obj.stats.nUnique
                        ? obj.stats.SturgesBins
                        : obj.stats.nUnique;
                break;
            case 'Rice Rule':
                calculateRiceBinWidth.call(this, obj);
                obj.stats.nBins =
                    obj.stats.RiceBins < obj.stats.nUnique ? obj.stats.RiceBins : obj.stats.nUnique;
                break;
            // case 'Doane\'s formula':
            //    console.log(4);
            //    calculateDoaneBinWidth.call(this, obj);
            //    obj.stats.nBins =
            //        obj.stats.DoaneBins < obj.stats.nUnique ? obj.stats.DoaneBins : obj.stats.nUnique;
            //    break;
            case "Scott's normal reference rule":
                calculateScottBinWidth.call(this, obj);
                obj.stats.nBins =
                    obj.stats.ScottBins < obj.stats.nUnique
                        ? obj.stats.ScottBins
                        : obj.stats.nUnique;
                break;
            case "Freedman-Diaconis' choice":
                calculateFDBinWidth.call(this, obj);
                obj.stats.nBins =
                    obj.stats.FDBins < obj.stats.nUnique ? obj.stats.FDBins : obj.stats.nUnique;
                break;
            case "Shimazaki and Shinomoto's choice":
                calculateSSBinWidth.call(this, obj);
                obj.stats.nBins =
                    obj.stats.SSBins < obj.stats.nUnique ? obj.stats.SSBins : obj.stats.nUnique;
                break;
            default:
                // Handle custom number of bins.
                obj.stats.nBins = this.config.x.bin;
            // obj.stats.binWidth = this.config.x.domain[1] - this.config.x.domain[0] / this.config.x.bin;
        }

        // Calculate bin width.
        obj.stats.binWidth = obj.stats.range / obj.stats.nBins;
        obj.stats.binBoundaries = range(obj.stats.nBins).concat(obj.domain[1]);
    });

    // Update chart config and set chart data to measure data.
    this.config.x.bin = this.measure[this.measure.domain_state].stats.nBins;
    this.config.x.bin_width = this.measure[this.measure.domain_state].stats.binWidth;
}
