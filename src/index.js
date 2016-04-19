import { createChart, createControls, createTable } from 'webcharts';
import {  controlInputs } from './default-settings'
import config from './default-settings';
import onInit from './onInit';
import onLayout from './onLayout';
import onDataTransform from './onDataTransform';
import onDraw from './onDraw';
import onResize from './onResize';
import './object-assign';

export default function outlierExplorer(element, settings){
	//merge user's settings with defaults
	let mergedSettings = Object.assign({}, config, settings);
	//set some options based on the start_value
	mergedSettings.x.label = mergedSettings.start_value;
	mergedSettings.x.column = mergedSettings.value_col;
	mergedSettings.marks[0].per[0] = mergedSettings.value_col;
	controlInputs[0].value_col = mergedSettings.measure_col;
	controlInputs[0].start = mergedSettings.start_value;
	
	//create controls now
	let controls = createControls(element, {location: 'top', inputs: controlInputs});
	//create chart
	let chart = createChart(element, mergedSettings, controls);
	chart.on('init', onInit);
	chart.on('layout', onLayout);
	chart.on('datatransform', onDataTransform);
	chart.on('draw', onDraw);
	chart.on('resize', onResize);

	let table = createTable(element, {}).init([]);
	chart.table = table;

	return chart;
}