export default function webchartsSettings() {
    return {
        x: {
            type: 'linear',
            column: null, // set in ./syncSettings
            label: null, // set in ../callbacks/onPreprocess/setXaxisLabel
            domain: [null, null], // set in ../callbacks/onPreprocess/setXdomain
            format: null, // set in ../callbacks/onPreprocess/calculateXPrecision
            bin: null // set in ../callbacks/onPreprocess/defineMeasureData
        },
        y: {
            type: 'linear',
            column: null,
            label: '# of Observations',
            domain: [0, null],
            format: '1d',
            behavior: 'flex'
        },
        marks: [
            {
                per: [], // set in ./syncSettings
                type: 'bar',
                summarizeX: 'mean',
                summarizeY: 'count',
                attributes: { 'fill-opacity': 0.75 }
            }
        ],
        color_by: null,
        legend: {},
        aspect: 3
    };
}
