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
        {
            type: 'dropdown',
            option: 'x.bin_algorithm',
            label: 'Algorithm',
            values: [
                'Square-root choice',
                "Sturges' formula",
                'Rice Rule',
                //'Doane\'s formula',
                "Scott's normal reference rule",
                "Freedman-Diaconis' choice",
                "Shimazaki and Shinomoto's choice",
                'Custom'
            ],
            require: true
        },
        {
            type: 'number',
            option: 'x.bin',
            label: 'Quantity'
        },
        {
            type: 'number',
            option: 'x.bin_width',
            label: 'Width'
        }
    ];
}
