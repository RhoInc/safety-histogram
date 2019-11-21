// utilities
import './util/polyfills';
import './util/moveTo';
import clone from './util/clone';

// DOM
import layout from './layout';
import styles from './styles';

// displays
import configuration from './configuration/index';
import { createChart, createControls, createTable } from 'webcharts';
import callbacks from './callbacks/index';

export default function safetyHistogram(element = 'body', settings = {}) {
    const containers = layout(element);
    styles();

    // Merge and sync settings.
    const mergedSettings = Object.assign(
        {},
        JSON.parse(JSON.stringify(configuration.settings)), // clone settings
        settings
    );
    const syncedSettings = configuration.syncSettings(mergedSettings);
    const controlsSettings = {
        inputs: configuration.syncControlInputs(configuration.controlInputs(), syncedSettings)
    };
    const chartSettings = clone(syncedSettings);
    const multiplesSettings = clone(syncedSettings);
    const listingSettings = Object.assign(
        {},
        {
            cols: syncedSettings.details.map(detail => detail.value_col),
            headers: syncedSettings.details.map(detail => detail.label)
        },
        syncedSettings
    );

    // Define controls.
    const controls = createControls(containers.controls.node(), controlsSettings);

    // Define chart.
    const chart = createChart(containers.chart.node(), chartSettings, controls);
    chart.settings = clone(chartSettings);
    for (const callback in callbacks)
        chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    // Define multiples.
    const multiples = createChart(containers.multiples.node(), multiplesSettings);
    multiples.settings = clone(multiplesSettings);

    // Define listing.
    const listing = createTable(containers.listing.node(), listingSettings);
    listing.settings = clone(listingSettings);

    // Attach listing to chart.
    chart.containers = containers;
    chart.multiples = multiples;
    chart.listing = listing;
    listing.chart = chart;

    // Initialize listing and hide initially.
    listing.init([]);
    listing.wrap.style('display', 'none');
    listing.wrap.selectAll('.table-top,table,.table-bottom').style({
        float: 'left',
        clear: 'left',
        width: '100%'
    });
    listing.table.style('white-space', 'nowrap');

    return chart;
}
