"use strict";

var safetyHistogram = (function (webcharts, d3$1) {
    'use strict';

    var settings$1 = {
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

        var listing = this.table;

        //Display data listing on bin click.
        var cleanF = d3$1.format('.3f');
        var bins = this.svg.selectAll('.bar');
        var footnote = this.wrap.select('.annote');

        bins.style('cursor', 'pointer').on('click', function (d) {
            footnote.classed('tableTitle', true).text("Table displays " + d.values.raw.length + " records with " + measure + " values from " + cleanF(d.rangeLow) + " to " + cleanF(d.rangeHigh) + " " + units + ".");
            listing.draw(d.values.raw);
            bins.attr('fill-opacity', 0.5);
            d3$1.select(this).attr('fill-opacity', 1);
        }).on('mouseover', function (d) {
            if (footnote.classed('tableTitle') === false) {
                footnote.text(d.values.raw.length + " records with " + measure + " values from " + cleanF(d.rangeLow) + " to " + cleanF(d.rangeHigh) + " " + units + ".");
            }
        }).on('mouseout', function (d) {
            if (footnote.classed('tableTitle') === false) {
                footnote.text('Click a bar for details.');
            }
        });

        this.svg.select('.overlay').on('click', function () {
            listing.draw([]);
            bins.attr('fill-opacity', 0.75);

            if (footnote.classed('tableTitle')) {
                footnote.classed('tableTitle', false).text('Click a bar for details.');
            }
        });

        //Add normal ranges.
        if (this.raw_data[0][settings.normal_col_low] && this.raw_data[0][settings.normal_col_high]) {
            var normalRange = [d3.median(this.filtered_data, function (d) {
                return d[settings.normal_col_low];
            }), d3.median(this.filtered_data, function (d) {
                return d[settings.normal_col_high];
            })];

            var canvas = d3.select('.bar-supergroup');
            canvas.select('#normalRange').remove();
            canvas.insert('rect', ':first-child').attr({ id: 'normalRange',
                x: Math.max(0, this.x(normalRange[0])),
                y: 0,
                width: Math.min(this.plot_width - this.x(normalRange[0]), this.x(normalRange[1]) - this.x(normalRange[0])),
                height: this.plot_height }).style({ stroke: '#fc8d62',
                fill: '#fc8d62',
                'fill-opacity': .25,
                'stroke-opacity': .25 }).append('title').text(measure + " normal range: " + normalRange[0] + "-" + normalRange[1] + " " + units);
        }
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

    function safetyHistogram(element, settings) {

        //merge user's settings with defaults
        var mergedSettings = Object.assign({}, settings$1, settings);

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

