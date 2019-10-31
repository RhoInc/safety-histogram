import { range, layout, mean, sum, min } from 'd3';

export default function calculateSSBinWidth(obj) {
    // https:// en.wikipedia.org/wiki/Histogram#Shimazaki_and_Shinomoto's_choice
    const nBins = range(2, 100); // number of bins
    const cost = range(nBins.length); // cost function results
    const binWidths = [...cost]; // bin widths
    const binBoundaries = [...cost]; // bin boundaries
    const bins = [...cost]; // bins
    const binSizes = [...cost]; // bin lengths
    const meanBinSizes = [...cost]; // mean of bin lengths
    const residuals = [...cost]; // residuals

    for (let i = 0; i < nBins.length; i++) {
        binWidths[i] = obj.stats.range / nBins[i];
        binBoundaries[i] = range(obj.stats.min, obj.stats.max, obj.stats.range / nBins[i]);
        bins[i] = layout.histogram().bins(nBins[i] - 1)(/*.bins(binBoundaries[i])*/ obj.results);
        binSizes[i] = bins[i].map(arr => arr.length);
        meanBinSizes[i] = mean(binSizes[i]);
        residuals[i] =
            sum(binSizes[i].map(binSize => Math.pow(binSize - meanBinSizes[i], 2))) / nBins[i];
        cost[i] = (2 * meanBinSizes[i] - residuals[i]) / Math.pow(binWidths[i], 2);
    }

    function consoleLogVars(object, index) {
        Object.keys(object).forEach(key => {
            console.log(`${key}: ${index ? object[key][index] : object[key]}`);
        });
    }

    // consoleLogVars(
    //    {
    //        nBins,
    //        binWidths,
    //        binBoundaries,
    //        // bins,
    //        binSizes,
    //        meanBinSizes,
    //        residuals,
    //        cost
    //    },
    //    5
    // );

    const minCost = min(cost);
    const idx = cost.findIndex(c => c === minCost);

    obj.stats.SSBinWidth = binWidths[idx];
    obj.stats.SSBins = nBins[idx];
    // const optBinBoundaries = range(obj.stats.min, obj.stats.max, obj.stats.range/optNBins);
}
