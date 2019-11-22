export default function styles(settings) {
    const styles = [
        '.safety-histogram {' +
        '    display: inline-block;' +
        '    width: 100%;' +
        '}',
        '.safety-histogram > * {' +
        '    display: inline-block;' +
        '    width: 100%;' +
        '}',
        '.sh-hidden {' +
        '    display: none !important;' +
        '}',

        /***--------------------------------------------------------------------------------------\
          Controls
        \--------------------------------------------------------------------------------------***/

            '.sh-controls {' +
            '}',
            '.sh-controls .wc-controls {' +
            '    border-bottom: 1px solid #ccc;' +
            '    padding-bottom: 20px;' +
            '    position: relative;' +
            '}',
            '.sh-algorithm-explanation {' +
            '    cursor: pointer;' +
            '}',
            '.sh-head-note {' +
            '    position: absolute;' +
            '    font-style: italic;' +
            '    bottom: 0px;' +
            '}',
            '.sh-head-note--participant-count {' +
            '    left: 0;' +
            '}',
            '.sh-head-note--removed-records {' +
            '    right: 0;' +
            '}',
            '.sh-clear-note {' +
            '    color: blue;' +
            '    text-decoration: underline;' +
            '    font-style: normal;' +
            '    font-weight: bold;' +
            '    cursor: pointer;' +
            '    font-size: 16px;' +
            '    margin-left: 5px;' +
            '}',

        /***--------------------------------------------------------------------------------------\
          Chart
        \--------------------------------------------------------------------------------------***/

            '.sh-chart {' +
                (
                    settings.draw_multiples
                        ?   '    width: 75%;' +
                            '    float: left;'
                        :   '    width: 100%;'
                ) +
            '}',
            '.bar-group {' +
            '    cursor: pointer;' +
            '}',
            '.sh-footnotes {' +
            '    border-top: 1px solid #ccc;' +
            '    padding-top: 10px;' +
            '}',

        /***--------------------------------------------------------------------------------------\
          Small multiples
        \--------------------------------------------------------------------------------------***/

            '.sh-multiples {' +
                (
                    settings.draw_multiples
                        ?   '    display: inline-block;' +
                            '    width: 24%;' +
                            '    float: right;'
                        :   '    display: none;'
                ) +
            '}',
            '.sh-multiples .wc-small-multiples .wc-chart {' +
            '    display: inline-block;' +
            '    width: 100%;' +
            '    position: relative;' +
            '    padding: 0;' +
            '}',
            '.sh-multiples .wc-small-multiples .wc-chart .wc-chart-title {' +
            '    text-align: left;' +
            '    font-size: 12px;' +
            '}',
            '.sh-group-percentage {' +
            '    font-weight: normal;' +
            '}',
            '.sh-statistical-test {' +
            '    position: absolute;' +
            '    top: 0;' +
            '    right: 0;' +
            '    background: white;' +
            '    border: 1px solid #aaa;' +
            '    border-radius: 4px;' +
            '    padding: 2px 4px;' +
            '}',
            '.sh-statistical-test__p-value {' +
            '    font-weight: bold;' +
            '    cursor: help;' +
            '}',
            '.sh-statistical-test__info {' +
            '    font-weight: normal;' +
            '    cursor: pointer;' +
            '}',
            '#group-by {' +
            '    width: 100%;' +
            '    padding-bottom: 4px;' +
            '    border-bottom: 1px solid #aaa;' +
            '    margin-bottom: 4px;' +
            '    display: flex;' +
            '    justify-content: center;' +
            '}',
            '#group-by .wc-control-label {' +
            '    margin-right: 5px;' +
            '}',
            '#group-by .span-description {' +
            '    display: none;' +
            '}',
            '#group-by .changer {' +
            '}',

        /***--------------------------------------------------------------------------------------\
          Listing
        \--------------------------------------------------------------------------------------***/

            '.sh-listing {' +
                (
                    settings.draw_multiples
                        ?   '    width: 75%;' +
                            '    float: left;'
                        :   '    width: 100%;'
                ) +
            '}',
    ];

    // Attach styles to DOM.
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);

    return style;
}
