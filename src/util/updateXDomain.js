export function updateXDomain(chart) {
    var xMinSelect = chart.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'x.domain[0]')
        .select('input');

    var xMaxSelect = chart.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'x.domain[1]')
        .select('input');

    //switch the values if min > max
    var range = [xMinSelect.node().value, xMaxSelect.node().value].sort(function(a, b) {
        return a - b;
    });

    // add some padding if min = max
    if (range[0] === range[1]) {
        range = [+range[0] - +range[0] * 0.05, +range[1] + +range[1] * 0.05];
        console.warn("Can't specify a 0 range, so some padding was added.");
    }

    //update the select values if needed
    xMinSelect.node().value = range[0];
    xMaxSelect.node().value = range[1];

    //apply custom domain to the chart
    chart.config.x.domain = range;
    chart.x_dom = range;
}
