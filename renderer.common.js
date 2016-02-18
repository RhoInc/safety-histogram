'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _interopDefault(ex) {
    return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = _interopDefault(require('react'));
var d3 = require('d3');
var webcharts = require('webcharts');

function stringAccessor(o, s, v) {
    //adapted from http://jsfiddle.net/alnitak/hEsys/
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            if (i == n - 1 && v !== undefined) o[k] = v;
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

var binding = {
    dataMappings: [],
    chartProperties: [{
        source: "start_value",
        target: "start_value"
    }]
};

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

var ReactHistogram = (function (_React$Component) {
    _inherits(ReactHistogram, _React$Component);

    function ReactHistogram(props) {
        _classCallCheck(this, ReactHistogram);

        _get(Object.getPrototypeOf(ReactHistogram.prototype), 'constructor', this).call(this, props);
        this.state = {};
    }

    _createClass(ReactHistogram, [{
        key: 'componentDidMount',
        value: function componentDidMount(prevProps, prevState) {
            if (this.props.data.length) {
                //manually clear div and redraw
                d3.select('.chart-div.id-' + this.props.id).selectAll('*').remove();
                var chart = outlierExplorer('.chart-div.id-' + this.props.id, this.props.settings).init(this.props.data);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.props.data.length) {
                //manually clear div and redraw
                d3.select('.chart-div.id-' + this.props.id).selectAll('*').remove();
                var chart = outlierExplorer('.chart-div.id-' + this.props.id, this.props.settings).init(this.props.data);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('div', {
                key: this.props.id,
                className: 'chart-div id-' + this.props.id + ' ' + (!this.props.data.length ? 'loading' : ''),
                style: { minHeight: '1px', minWidth: '1px' }
            });
        }
    }]);

    return ReactHistogram;
})(React.Component);

ReactHistogram.defaultProps = { data: [], controlInputs: [], id: 'id' };

function describeCode(props) {
    var settings = this.createSettings(props);

    var code = '//uses d3 v.' + d3.version + '\n//uses webcharts v.' + webcharts.version + '\n\nvar settings = ' + JSON.stringify(settings, null, 2) + ';\n\nvar myChart = histogram(dataElement, settings);\n\nd3.csv(dataPath, function(error, csv) {\n  myChart.init(data);\n});\n    ';
    return code;
}

var Renderer = (function (_React$Component2) {
    _inherits(Renderer, _React$Component2);

    function Renderer(props) {
        _classCallCheck(this, Renderer);

        _get(Object.getPrototypeOf(Renderer.prototype), 'constructor', this).call(this, props);
        this.binding = binding;
        this.describeCode = describeCode.bind(this);
        this.state = { data: [], settings: {}, template: {}, loadMsg: 'Loading...' };
    }

    _createClass(Renderer, [{
        key: 'createSettings',
        value: function createSettings(props) {
            var shell = Object.assign({}, settings);

            binding.dataMappings.forEach(function (e) {
                var chartVal = stringAccessor(props.dataMappings, e.source);
                if (chartVal) {
                    stringAccessor(shell, e.target, chartVal);
                } else {
                    var defaultVal = stringAccessor(props.template.dataMappings, e.source + '.default');
                    if (defaultVal && typeof defaultVal === 'string' && defaultVal.slice(0, 3) === 'dm$') {
                        var pointerVal = stringAccessor(props.dataMappings, defaultVal.slice(3)) || null;
                        stringAccessor(shell, e.target, pointerVal);
                    } else if (defaultVal) {
                        stringAccessor(shell, e.target, defaultVal);
                    } else {
                        stringAccessor(shell, e.target, null);
                    }
                }
            });
            binding.chartProperties.forEach(function (e) {
                var chartVal = stringAccessor(props.chartProperties, e.source);

                if (chartVal !== undefined) {
                    stringAccessor(shell, e.target, chartVal);
                } else {
                    var defaultVal = stringAccessor(props.template.chartProperties, e.source + '.default');
                    stringAccessor(shell, e.target, defaultVal);
                }
            });

            return shell;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var settings = this.createSettings(this.props);
            this.setState({ settings: settings });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var settings = this.createSettings(nextProps);
            this.setState({ settings: settings });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(ReactHistogram, {
                id: this.props.id,
                settings: this.state.settings,
                controlInputs: this.props.template.controls,
                data: this.props.data
            });
        }
    }]);

    return Renderer;
})(React.Component);

module.exports = Renderer;

