import './util/polyfills';
import defaultSettings, { syncSettings, syncControlInputs } from './defaultSettings';
import { createChart, createControls, createTable } from 'webcharts';
import callbacks from './callbacks/index';

export default function safetyHistogram(element, settings) {
    //Define chart.
    const mergedSettings = Object.assign({}, defaultSettings, settings);
    const syncedSettings = syncSettings(mergedSettings);
    const syncedControlInputs = syncControlInputs(syncedSettings);
    const controls = createControls(element, { location: 'top', inputs: syncedControlInputs });
    const chart = createChart(element, syncedSettings, controls);

    //Define chart callbacks.
    for (const callback in callbacks)
        chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    //Define listing
    const listingSettings = {
        cols: syncedSettings.details.map(detail => detail.value_col),
        headers: syncedSettings.details.map(detail => detail.label),
        searchable: syncedSettings.searchable,
        sortable: syncedSettings.sortable,
        pagination: syncedSettings.pagination,
        exportable: syncedSettings.exportable
    };
    const listing = createTable(element, listingSettings);

    //Attach listing to chart.
    chart.listing = listing;
    listing.chart = chart;

    //Initialize listing and hide initially.
    chart.listing.init([]);
    chart.listing.wrap.selectAll('*').style('display', 'none');

    return chart;
}
