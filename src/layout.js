import { select } from 'd3';

export default function layout(element) {
    const containers = {
        main: select(element)
            .append('div')
            .classed('safety-histogram', true)
    };

    containers.controls = containers.main.append('div').classed('sh-controls', true);

    containers.chart = containers.main.append('div').classed('sh-chart', true);

    containers.multiples = containers.main.append('div').classed('sh-multiples', true);

    containers.listing = containers.main.append('div').classed('sh-listing', true);

    return containers;
}
