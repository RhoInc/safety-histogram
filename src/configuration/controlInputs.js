export default function controlInputs() {
    return [
        {
            type: 'subsetter',
            value_col: 'sh_measure',
            label: 'Measure',
            start: null // set in ../callbacks/onInit/checkControls/updateMeasureFilter
        },
        {
            type: 'number',
            option: 'x.domain[0]',
            label: 'Lower',
            require: true
        },
        {
            type: 'number',
            option: 'x.domain[1]',
            label: 'Upper',
            require: true
        },
        {
            type: 'checkbox',
            option: 'displayNormalRange',
            label: 'Normal Range'
        },
    ];
}
