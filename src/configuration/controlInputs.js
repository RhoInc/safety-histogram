export default function controlInputs() {
    return [
        {
            type: 'subsetter',
            label: 'Measure',
            value_col: 'sh_measure',
            start: null // set in ../callbacks/onInit/checkControls/updateMeasureFilter
        },
        {
            type: 'dropdown',
            label: 'Group by',
            option: 'group_by',
            start: null, // set in ./syncControlInputs
            values: null, // set in ./syncControlInputs
            require: false
        },
        {
            type: 'number',
            label: 'Lower',
            option: 'x.domain[0]',
            require: true
        },
        {
            type: 'number',
            label: 'Upper',
            option: 'x.domain[1]',
            require: true
        },
        {
            type: 'dropdown',
            label: 'Algorithm',
            option: 'x.bin_algorithm',
            values: [
                'Square-root choice',
                "Sturges' formula",
                'Rice Rule',
                // 'Doane\'s formula',
                "Scott's normal reference rule",
                "Freedman-Diaconis' choice",
                "Shimazaki and Shinomoto's choice",
                'Custom'
            ],
            require: true
        },
        {
            type: 'number',
            label: 'Quantity',
            option: 'x.bin'
        },
        {
            type: 'number',
            label: 'Width',
            option: 'x.bin_width'
        },
        {
            type: 'checkbox',
            label: 'Normal Range',
            option: 'displayNormalRange'
        },
        {
            type: 'radio',
            label: 'X-axis Ticks',
            option: 'annotate_bin_boundaries',
            values: [false, true],
            relabels: ['linear', 'bin boundaries']
        }
    ];
}
