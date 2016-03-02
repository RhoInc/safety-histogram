"use strict";

var histogram = (function (webcharts, d3) {
	'use strict';

	var value_col = "STRESN";
	var settings = {
		//Addition settings for this template
		id_col: "USUBJID",
		time_col: "VISITN",
		measure_col: "TEST",
		value_col: value_col,
		unit_col: "STRESU",
		normal_col_low: "STNRLO",
		normal_col_high: "STNRHI",
		start_value: null,
		rotateX: true,
		missingValues: ["NA", ""],
		//Standard webcharts settings
		x: {
			"label": null,
			"type": "linear",
			"column": value_col,
			"bin": 25,
			behavior: 'flex',
			"format": '.1f'
		},
		y: {
			"label": "# of Measures",
			"type": "linear",
			"behavior": 'flex',
			"column": "",
			"domain": [0, null]
		},
		marks: [{
			"per": [value_col],
			"type": "bar",
			"summarizeY": "count",
			"summarizeX": "mean",
			"attributes": { "fill-opacity": 0.75 }
		}],
		"legend": {
			"mark": "square",
			"label": "cohort"
		},
		"aspect": 1.66,
		"max_width": "800"
	};

	var controlInputs = [{ label: "Lab Test", type: "subsetter", value_col: "TEST", start: null }, { label: "Sex", type: "subsetter", value_col: "SEX" }, { label: "Race", type: "subsetter", value_col: "RACE" }, { label: "Visit", type: "subsetter", value_col: "VISIT" }];

	function onInit() {
		var _this = this;

		var config = this.config;
		var allMeasures = d3.set(this.raw_data.map(function (m) {
			return m[config.measure_col];
		})).values();

		// "All" variable for non-grouped comparisons
		this.raw_data.forEach(function (e) {
			return e[config.measure_col] = e[config.measure_col].trim();
		});

		//Drop missing values
		this.raw_data = this.raw_data.filter(function (f) {
			return config.missingValues.indexOf(f[config.value_col]) === -1;
		});

		//warning for non-numeric endpoints
		var catMeasures = allMeasures.filter(function (f) {
			var measureVals = _this.raw_data.filter(function (d) {
				return d[config.measure_col] === f;
			});

			return webcharts.dataOps.getValType(measureVals, config.value_col) !== "continuous";
		});
		if (catMeasures.length) {
			console.warn(catMeasures.length + " non-numeric endpoints have been removed: " + catMeasures.join(", "));
		}

		//delete non-numeric endpoints
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
		var units = this.filtered_data[0] ? this.filtered_data[0][this.config.unit_col] : this.raw_data[0][this.config.unit_col];
		var measure = this.filtered_data[0] ? this.filtered_data[0][this.config.measure_col] : this.raw_data[0][this.config.measure_col];
		//Customize the x-axis label
		this.config.x.label = measure + " level (" + units + ")";

		//Reset linked table
		this.table.draw([]);
		this.svg.selectAll('.bar').attr('opacity', 1);
	}

	function onDraw() {}

	function onResize() {
		var config = this.config;
		var units = this.filtered_data[0] ? this.filtered_data[0][this.config.unit_col] : this.raw_data[0][this.config.unit_col];
		var measure = this.filtered_data[0] ? this.filtered_data[0][this.config.measure_col] : this.raw_data[0][this.config.measure_col];

		//pointer to the linked table
		var myTable = this.table;

		//Show table of values in a bar on click
		var cleanF = d3.format(".3f");
		var myBars = this.svg.selectAll('.bar');

		var note = this.wrap.select('.annote');

		myBars.style('cursor', 'pointer').on('click', function (d) {
			note.classed("tableTitle", true).text("Table shows " + d.values.raw.length + " records with " + measure + " values from " + cleanF(d.rangeLow) + " to " + cleanF(d.rangeHigh) + " " + units + ".");

			myTable.draw(d.values.raw);
			myBars.attr('fill-opacity', 0.5);
			d3.select(this).attr('fill-opacity', 1);
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

	function outlierExplorer(element, settings$$) {
		//merge user's settings with defaults
		var mergedSettings = Object.assign({}, settings, settings$$);
		//set some options based on the start_value
		mergedSettings.x.label = mergedSettings.start_value;
		mergedSettings.x.column = mergedSettings.value_col;
		mergedSettings.marks[0].per[0] = mergedSettings.value_col;
		controlInputs[0].value_col = mergedSettings.measure_col;
		controlInputs[0].start = mergedSettings.start_value;

		//create controls now
		var controls = webcharts.createControls(element, { location: 'top', inputs: controlInputs });
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

	return outlierExplorer;
})(webCharts, d3);
