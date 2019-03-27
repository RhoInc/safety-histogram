export default function controlInputs() {
    return [
        {
            type: 'subsetter',
            label: 'Measure',
            value_col: null, // set in ./syncControlInputs
            start: null // set in ./syncControlInputs
        },
        {
            type: 'checkbox',
            label: 'Normal Range',
            option: 'displayNormalRange'
        },
        {
            type: 'number',
            label: 'Lower Limit',
            option: 'x.domain[0]',
            require: true
        },
        {
            type: 'number',
            label: 'Upper Limit',
            option: 'x.domain[1]',
            require: true
        }
    ];
}
