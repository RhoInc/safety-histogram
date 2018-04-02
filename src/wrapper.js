//polyfills
import './polyfills/object-assign';
import './polyfills/array-find';
import './polyfills/array-findIndex';

//settings
import defaultSettings, { syncSettings, syncControlInputs } from './defaultSettings';

//webcharts
import { createChart, createControls, createTable } from 'webcharts';
import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDatatransform from './onDatatransform';
import onDraw from './onDraw';
import onResize from './onResize';
import onDestroy from './onDestroy';

export default function safetyHistogram(element, settings) {
    //Define chart.
    const mergedSettings = Object.assign({}, defaultSettings, settings);
    const syncedSettings = syncSettings(mergedSettings);
    const syncedControlInputs = syncControlInputs(syncedSettings);
    const controls = createControls(element, { location: 'top', inputs: syncedControlInputs });
    const chart = createChart(element, syncedSettings, controls);

    //Define chart callbacks.
    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('preprocess', onPreprocess);
    chart.on('datatransform', onDatatransform);
    chart.on('draw', onDraw);
    chart.on('resize', onResize);
    chart.on('destroy', onDestroy);

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

    //Initialize listing and hide initially.
    chart.listing.init([]);
    chart.listing.wrap.selectAll('*').style('display', 'none');

    return chart;
}
