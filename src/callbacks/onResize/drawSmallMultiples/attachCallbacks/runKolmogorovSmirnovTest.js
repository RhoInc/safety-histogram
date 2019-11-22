import jerzy from 'jerzy';

// TODO: Clean up the jerzy library by declaring any undeclared variables, like the methods themselves.
export default function runKolmogorovSmirnovTest() {
    if (this.sh.config.compare_distributions) {
        const x = new jerzy.Vector(this.raw_data.map(d => +d[this.config.x.column]));
        const y = new jerzy.Vector(this.filtered_data.map(d => +d[this.config.x.column]));
        this.ks = jerzy.Nonparametric.kolmogorovSmirnov(x, y);

        // Annotate p-value.
        const pValue = this.wrap
            .select('.wc-chart-title')
            .append('span')
            .classed('sh-statistical-test sh-ks-test', true);

        pValue
            .append('span')
            .classed('sh-statistical-test__p-value', true)
            .attr(
                'title',
                'The two-sample Kolmogorov-Smirnov test tests whether two underlying one-dimensional probability distributions differ.\n' +
                    `In this case the test compares the distribution of results where ${this.sh.config.group_label} = ${this.filters[0].val} with that of the full set of results.`
            )
            .text(`p = ${d3.format('.2f')(this.ks.p)}`);

        pValue
            .append('span')
            .classed('sh-statistical-test__info', true)
            .attr('title', 'Click to view information on the two-sample Kolmogorov-Smirnov test.')
            .html(' &#9432')
            .on('click', () => {
                window.open(
                    'https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test#Two-sample_Kolmogorov%E2%80%93Smirnov_test'
                );
            });
    }
}
