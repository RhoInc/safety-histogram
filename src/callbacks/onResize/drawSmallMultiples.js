import { createChart, multiply } from 'webcharts';
import defineSettings from './drawSmallMultiples/defineSettings';
import attachCallbacks from './drawSmallMultiples/attachCallbacks';

export default function drawSmallMultiples() {
    // Destroy previously drawn small multiples.
    if (this.multiples) this.multiples.destroy();

    if (this.config.draw_multiples && this.config.group_by !== 'sh_none') {
        // Update settings.
        const settings = defineSettings.call(this);

        // Instantiate small multiples.
        this.multiples = createChart(this.containers.multiples.node(), settings);
        this.multiples.sh = this;

        // Attach callbacks.
        attachCallbacks.call(this);

        // Initialize small multiples.
        multiply(this.multiples, this.filtered_data.slice(), this.config.group_by);
    }
}
