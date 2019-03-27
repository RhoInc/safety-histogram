export default function webchartsSettings() {
    return {
        //chart settings
        x: {
            type: 'linear',
            column: null, // set in syncSettings()
            label: null, // set in syncSettings()
            domain: [null, null], // set in preprocess callback
            format: null, // set in preprocess callback
            bin: 25
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
                per: [], // set in syncSettings()
                type: 'bar',
                summarizeY: 'count',
                summarizeX: 'mean',
                attributes: { 'fill-opacity': 0.75 }
            }
        ],
        aspect: 3
    };
}
