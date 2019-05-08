export default function binResults() {
    this.measure.raw.stats.bins.forEach(bin => {
        bin.label = `${this.config.x.d3format(bin.x)}-${this.config.x.d3format(bin.x + bin.dx)}`;
        console.log(bin);
    });
    this.measure.filtered.data.forEach(d => {
        const bin = this.measure.raw.stats.bins
            .find(bin => bin.indexOf(+d[this.config.value_col]) > -1);
        if (bin)
            d.sh_bin = bin.label;
        else
            console.log(d[this.config.value_col]);
    });
    console.log(d3.nest().key(d => d.sh_bin).rollup(d => d.length).entries(this.measure.raw.data));

/*------------------------------------------------------------------------------------------------\
  Chart
\------------------------------------------------------------------------------------------------*/

    const element = this.div;
    const settings = {
        x: {
            type: 'ordinal',
            column: 'sh_bin',
            label: this.config.x.label,
            domain: this.measure.raw.stats.bins.map(bin => bin.label)
        },
        y: {
            type: 'linear',
            column: null,
            label: '# of Observations',
            format: '1d',
        },
        marks: [
            {
                type: 'bar',
                per: ['sh_bin'],
                summarizeY: 'count',
            },
        ],
        padding: 0,
        aspect: 3,
    };
    const chart = new webCharts.createChart(
        element,
        settings,
    );
    chart.init(this.measure.filtered.data);
}
