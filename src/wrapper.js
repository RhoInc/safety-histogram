import './util/object-assign';
import defaultSettings from './defaultSettings';
import { syncSettings, syncControlInputs } from './defaultSettings';

import { createChart, createControls, createTable } from 'webcharts';

import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDataTransform from './onDataTransform';
import onDraw from './onDraw';
import onResize from './onResize';

export default function safetyHistogram(element, settings) {
    //Merge user's settings with default settings.
    let mergedSettings = Object.assign({}, defaultSettings, settings);

    //Keep settings in sync with the data mappings.
    mergedSettings = syncSettings(mergedSettings);

    //Keep control inputs in sync and create controls object.
    let syncedControlInputs = syncControlInputs(mergedSettings);
    let controls = createControls(element, { location: 'top', inputs: syncedControlInputs });

    //Define chart
    let chart = createChart(element, mergedSettings, controls);
    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('preprocess', onPreprocess);
    chart.on('datatransform', onDataTransform);
    chart.on('draw', onDraw);
    chart.on('resize', onResize);

    let tableSettings =
        mergedSettings.details && mergedSettings.details.length > 0
            ? { cols: mergedSettings.details.map(d => d.value_col) }
            : null;
    let listing = createTable(element, tableSettings).init([]);
    chart.listing = listing;

    return chart;
}
