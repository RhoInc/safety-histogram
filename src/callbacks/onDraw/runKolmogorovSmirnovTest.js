import { set } from 'd3';
import vector from '../../util/stats/vector';
import nonparametric from '../../util/stats/nonparametric';

export default function runKolmogorovSmirnovTest() {
    if (this.config.compare_distributions && this.config.group_by !== 'sh_none') {
        const allResults = new vector.Vector(
            this.raw_data
                .map(d => +d[this.config.x.column])
        );

        this.groups = set(this.initial_data.map(d => d[this.config.group_by]))
            .values()
            .map(value => {
                const group = {
                    value,
                };
                group.results = new vector.Vector(
                    this.raw_data
                        .filter(d => d[this.config.group_by] === value)
                        .map(d => +d[this.config.x.column])
                );
                group.ks = nonparametric.kolmogorovSmirnov(allResults, group.results);

                return group;
            });
    }
}
