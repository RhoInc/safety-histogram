export default function styles() {
    const styles = [
        '.safety-histogram {' + '    display: inline-block;' + '    width: 100%;' + '}',
        '.safety-histogram > * {' + '    display: inline-block;' + '    width: 100%;' + '}',
        '.sh-controls {' + '}',
        '.sh-chart,' + '.sh-listing {' + '    width: 75%;' + '    float: left;' + '}',
        '.sh-chart {' + '}',
        '.sh-multiples {' + '    width: 24%;' + '    float: right;' + '}',
        '.sh-multiples .wc-small-multiples .wc-chart {' +
            '    display: inline-block;' +
            '    width: 100%;' +
            '    position: relative;' +
            '}',
        '.sh-multiples .wc-small-multiples .wc-chart.wc-chart-title {' +
            '    position: absolute;' +
            '    top: 0;' +
            '    right: 0;' +
            '    width: 100%;' +
            '}',
        '.sh-statistical-test {' +
            '    position: absolute;' +
            '    top: 0;' +
            '    right: 0;' +
            '    font-weight: bold;' +
            '    cursor: help;' +
            '}',
        '#group-by {' +
            '    width: 100%;' +
            '    padding-bottom: 4px;' +
            '    border-bottom: 1px solid #aaa;' +
            '    margin-bottom: 4px;' +
            '    display: flex;' +
            '    justify-content: center;' +
            '}',
        '#group-by .wc-control-label {' + '    margin-right: 5px;' + '}',
        '#group-by .span-description {' + '    display: none;' + '}',
        '#group-by .changer {' + '}',
        '.sh-listing {' + '}'
    ];

    // Attach styles to DOM.
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);
}
