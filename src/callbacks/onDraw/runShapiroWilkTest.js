import vector from '../../util/stats/vector';
import normality from '../../util/stats/normality';
import { format } from 'd3';

// TODO: Code review the shapiroWilk method because it differs slightly from the R calculation.
export default function runShapiroWilkTest() {
    if (this.config.test_normality) {
        const x = new vector.Vector(this.raw_data.map(d => +d[this.config.x.column]));
        this.sw = normality.shapiroWilk(x);

        // Annotate p-value.
        this.wrap.select('span.sh-sw-test').remove();
        const pValue = this.wrap
            .insert('span', ':first-child')
            .classed('sh-statistical-test sh-sw-test', true);

        pValue
            .append('span')
            .classed('sh-statistical-test__label', true)
            .text('Normality: ');

        pValue
            .append('span')
            .classed('sh-statistical-test__p-value', true)
            .attr(
                'title',
                'The Shapiro-Wilk test tests the null hypothesis that a sample x[1], ..., x[n] came from a normally distributed population.'
            )
            .text(`p = ${format('.2f')(this.sw.p)}`);

        pValue
            .append('span')
            .classed('sh-statistical-test__info', true)
            .attr('title', 'Click to view information on the Shapiro-Wilkd test.')
            .html(' &#9432')
            .on('click', () => {
                window.open('https://en.wikipedia.org/wiki/Shapiro%E2%80%93Wilk_test');
            });
    }
}
