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

export default function safetyHistogram(element, settings) {
    const mergedSettings = Object.assign({}, defaultSettings, settings),
        syncedSettings = syncSettings(mergedSettings),
        syncedControlInputs = syncControlInputs(syncedSettings),
        controls = createControls(element, { location: 'top', inputs: syncedControlInputs }),
        chart = createChart(element, syncedSettings, controls),
        listingSettings = {
            cols: syncedSettings.details.map(detail => detail.value_col),
            headers: syncedSettings.details.map(detail => detail.label),
            searchable: syncedSettings.searchable,
            sortable: syncedSettings.sortable,
            pagination: syncedSettings.pagination,
            exportable: syncedSettings.exportable
        };

    chart.listing = createTable(element, listingSettings);
    chart.listing.init([]);
    chart.listing.wrap.selectAll('*').style('display', 'none');

    //Define callbacks.
    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('preprocess', onPreprocess);
    chart.on('datatransform', onDatatransform);
    chart.on('draw', onDraw);
    chart.on('resize', onResize);

    return chart;
}
