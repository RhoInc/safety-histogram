"use strict";

var safetyHistogram = (function (webcharts, d3$1) {
	'use strict';

	var settings = {
		//Addition settings for this template
		value_col: "STRESN",
		measure_col: "TEST",
		unit_col: "STRESU",
		filters: [{ value_col: "SITE", label: 'Site' }, { value_col: "VISITN", label: 'Visit' }, { value_col: "SEX", label: 'Sex' }, { value_col: "RACE", label: 'Race' }],
		id_col: "USUBJID",
		normal_col_low: "STNRLO",
		normal_col_high: "STNRHI",
		start_value: null,
		rotateX: true,
		missingValues: ["NA", ""],

		//Standard webcharts settings
		x: {
			"column": null, //set in syncSettings()
			"label": null, //set in syncSettings()
			"type": "linear",
			"bin": 25,
			"behavior": 'flex',
			"format": '.1f'
		},
		y: {
			"label": "# of Observations",
			"type": "linear",
			"behavior": 'flex',
			"column": "",
			"domain": [0, null]
		},
		marks: [{
			"per": [], //set in syncSettings()
			"type": "bar",
			"summarizeY": "count",
			"summarizeX": "mean",
			"attributes": { "fill-opacity": 0.75 }
		}],
		"aspect": 1.66,
		"max_width": "800"
	};

	// Replicate settings in multiple places in the settings object
	function syncSettings(settings) {
		settings.x.label = settings.start_value;
		settings.x.column = settings.value_col;
		settings.marks[0].per[0] = settings.value_col;

		return settings;
	}

	// Map values from settings to control inputs
	function syncControlInputs(settings) {
		var controlInputs = [{
			label: "Measure",
			type: "subsetter",
			value_col: settings.measure_col,
			start: null }].concat(settings.filters.map(function (d) {
			return {
				label: d.label,
				type: "subsetter",
				value_col: d.value_col };
		}));

		return controlInputs;
	}

	function onInit() {
		var _this = this;

		var columns = d3.keys(this.raw_data[0]);
		this.controls.config.inputs = this.controls.config.inputs.filter(function (d) {
			return columns.indexOf(d.value_col) > -1;
		});

		var config = this.config;
		var allMeasures = d3$1.set(this.raw_data.map(function (m) {
			return m[config.measure_col];
		})).values();

		//"All" variable for non-grouped comparisons
		this.raw_data.forEach(function (e) {
			return e[config.measure_col] = e[config.measure_col].trim();
		});

		//Drop missing values
		this.raw_data = this.raw_data.filter(function (f) {
			return config.missingValues.indexOf(f[config.value_col]) === -1;
		});

		//Warning for non-numeric endpoints
		var catMeasures = allMeasures.filter(function (f) {
			var measureVals = _this.raw_data.filter(function (d) {
				return d[config.measure_col] === f;
			});

			return webcharts.dataOps.getValType(measureVals, config.value_col) !== "continuous";
		});
		if (catMeasures.length) {
			console.warn(catMeasures.length + " non-numeric endpoints have been removed: " + catMeasures.join(", "));
		}

		//Delete non-numeric endpoints
		var numMeasures = allMeasures.filter(function (f) {
			var measureVals = _this.raw_data.filter(function (d) {
				return d[config.measure_col] === f;
			});

			return webcharts.dataOps.getValType(measureVals, config.value_col) === "continuous";
		});

		this.raw_data = this.raw_data.filter(function (f) {
			return numMeasures.indexOf(f[config.measure_col]) > -1;
		});

		//Choose the start value for the Test filter
		this.controls.config.inputs[0].start = this.config.start_value || numMeasures[0];
	};

	function onLayout() {
		//add div for note
		this.wrap.insert('p', '.wc-chart').attr('class', 'annote').text('Click a bar for details.');
	}

	function onDataTransform() {
		var measure = this.filtered_data[0] ? this.filtered_data[0][this.config.measure_col] : this.raw_data[0][this.config.measure_col];
		var units = this.filtered_data[0] ? this.filtered_data[0][this.config.unit_col] : this.raw_data[0][this.config.unit_col];

		//Customize the x-axis label
		this.config.x.label = measure + " level (" + units + ")";

		//Reset linked table
		this.table.draw([]);
		this.svg.selectAll('.bar').attr('opacity', 1);
	}

	function onDraw() {}

	function onResize() {
		var config = this.config;
		var measure = this.filtered_data[0] ? this.filtered_data[0][this.config.measure_col] : this.raw_data[0][this.config.measure_col];
		var units = this.filtered_data[0] ? this.filtered_data[0][this.config.unit_col] : this.raw_data[0][this.config.unit_col];

		//pointer to the linked table
		var myTable = this.table;

		//Show table of values in a bar on click
		var cleanF = d3$1.format(".3f");
		var myBars = this.svg.selectAll('.bar');

		var note = this.wrap.select('.annote');

		myBars.style('cursor', 'pointer').on('click', function (d) {
			note.classed("tableTitle", true).text("Table shows " + d.values.raw.length + " records with " + measure + " values from " + cleanF(d.rangeLow) + " to " + cleanF(d.rangeHigh) + " " + units + ".");

			myTable.draw(d.values.raw);
			myBars.attr('fill-opacity', 0.5);
			d3$1.select(this).attr('fill-opacity', 1);
		})
		//Show # of values + range of a bar on mouseover
		.on('mouseover', function (d) {
			if (note.classed("tableTitle") == false) {
				note.text(d.values.raw.length + " records with " + measure + " values from " + cleanF(d.rangeLow) + " to " + cleanF(d.rangeHigh) + " " + units + ".");
			}
		}).on('mouseout', function (d) {
			if (note.classed("tableTitle") == false) {
				note.text("Click a bar for details.");
			}
		});

		this.svg.select('.overlay').on('click', function () {
			myTable.draw([]);
			myBars.attr('fill-opacity', 0.75);
			if (note.classed("tableTitle")) {
				note.classed("tableTitle", false).text("Click a bar for details.");
			}
		});
	}

	if (typeof Object.assign != 'function') {
		(function () {
			Object.assign = function (target) {
				'use strict';
				if (target === undefined || target === null) {
					throw new TypeError('Cannot convert undefined or null to object');
				}

				var output = Object(target);
				for (var index = 1; index < arguments.length; index++) {
					var source = arguments[index];
					if (source !== undefined && source !== null) {
						for (var nextKey in source) {
							if (source.hasOwnProperty(nextKey)) {
								output[nextKey] = source[nextKey];
							}
						}
					}
				}
				return output;
			};
		})();
	}

	function safetyHistogram(element, settings$$) {

		//merge user's settings with defaults
		var mergedSettings = Object.assign({}, settings, settings$$);

		//keep settings in sync with the data mappings
		mergedSettings = syncSettings(mergedSettings);

		//keep control inputs in sync and create controls object
		var syncedControlInputs = syncControlInputs(mergedSettings);
		var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });

		//create chart
		var chart = webcharts.createChart(element, mergedSettings, controls);
		chart.on('init', onInit);
		chart.on('layout', onLayout);
		chart.on('datatransform', onDataTransform);
		chart.on('draw', onDraw);
		chart.on('resize', onResize);

		var table = webcharts.createTable(element, {}).init([]);
		chart.table = table;

		return chart;
	}

	return safetyHistogram;
})(webCharts, d3);

