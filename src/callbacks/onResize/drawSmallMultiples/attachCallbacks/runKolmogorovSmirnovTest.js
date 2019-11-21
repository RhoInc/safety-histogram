import jerzy from 'jerzy';

// TODO: Clean up the jerzy library by declaring any undeclared variables, like the methods themselves.
export default function runKolmogorovSmirnovTest() {
    const x = new jerzy.Vector(this.raw_data.map(d => +d[this.config.x.column]));
    const y = new jerzy.Vector(this.filtered_data.map(d => +d[this.config.x.column]));
    this.ks = jerzy.Nonparametric.kolmogorovSmirnov(x, y);

    // Annotate p-value.
    this.wrap
        .select('.wc-chart-title')
        .append('span')
        .classed('sh-statistical-test sh-ks-test', true)
        .attr(
            'title',
            'The Kolmogorov-Smirnov test tests whether two underlying one-dimensional probability distributions differ.'
        )
        .text(`p = ${d3.format('.2f')(this.ks.p)}`);
}
