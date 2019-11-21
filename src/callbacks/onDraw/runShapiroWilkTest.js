import jerzy from 'jerzy';

// TODO: Code review the shapiroWilk method because it differs slightly from the R calculation.
export default function runShapiroWilkTest() {
    const x = new jerzy.Vector(this.raw_data.map(d => +d[this.config.x.column]));
    this.sw = jerzy.Normality.shapiroWilk(x);

    // Annotate p-value.
    this.wrap.select('span.sh-sw-test').remove();
    this.wrap
        .insert('span', ':first-child')
        .classed('sh-statistical-test sh-sw-test', true)
        .attr(
            'title',
            'The Shapiro-Wilk test tests the null hypothesis that a sample x[1], ..., x[n] came from a normally distributed population.'
        )
        .text(`p = ${d3.format('.2f')(this.sw.p)}`);
}
