import { createChart, multiply } from 'webcharts';
import clone from '../../util/clone';

export default function groupBars() {
    const settings = clone(this.settings);
    settings.x = Object.assign({}, this.config.x);
    settings.x.label = '';
    settings.y = Object.assign({}, this.config.y);
    settings.y.label = '';
    settings.width = 425;
    settings.height = settings.width/4;
    settings.resizable = false;
    settings.margin = {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
    };
    if (this.multiples)
        this.multiples.destroy();
    this.multiples = createChart(
        this.containers.multiples.node(),
        settings
    );
    multiply(
        this.multiples,
        this.filtered_data.slice(),
        this.config.group_by,
    );
    this.multiples.multiples
        .forEach(multiple => {
            multiple.on('init', function() {
                this.config.margin = {
                    top: 1,
                    right: 1,
                    bottom: 1,
                    left: 1
                };
            });
        });
    //console.log(this.current_data);
    console.log(this.config.x);
    console.log(this.multiples.multiples[0].config.x);
    //console.log(this.multiples.multiples[0].current_data);
}
