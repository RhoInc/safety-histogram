(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('d3'), require('webcharts')) :
	typeof define === 'function' && define.amd ? define(['react', 'd3', 'webcharts'], factory) :
	(global.safetyHistogram = factory(global.React,global.d3,global.webCharts));
}(this, function (React,d3$1,webcharts) { 'use strict';

	React = 'default' in React ? React['default'] : React;

	function stringAccessor (o, s, v) {
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
		dataMappings: [
		//custom settings
		{
			source: 'id_col',
			target: 'id_col'
		}, {
			source: 'time_col',
			target: 'time_col'
		}, {
			source: 'measure_col',
			target: 'measure_col'
		}, {
			source: 'value_col',
			target: 'value_col'
		}, {
			source: 'unit_col',
			target: 'unit_col'
		}, {
			source: 'sex_col',
			target: 'sex_col'
		}, {
			source: 'race_col',
			target: 'race_col'
		}, {
			source: 'normal_col_low',
			target: 'normal_col_low'
		}, {
			source: 'normal_col_high',
			target: 'normal_col_high'
		}, {
			source: 'start_value',
			target: 'start_value'
		}, {
			source: 'rotate_x',
			target: 'rotateX'
		}, {
			source: 'missing_values',
			target: 'missingValues'
		},
		// webcharts settings
		{
			source: "x",
			target: "x.column"
		}, {
			source: "x_order",
			target: "x.order"
		}, {
			source: "x_domain",
			target: "x.domain"
		}, {
			source: "y",
			target: "y.column"
		}, {
			source: "y_order",
			target: "y.order"
		}, {
			source: "y_domain",
			target: "y.domain"
		}, {
			source: "group",
			target: "marks.0.per"
		}, {
			source: "subgroup",
			target: "marks.0.split"
		}, {
			source: "subset",
			target: "marks.0.values"
		}, {
			source: "group2",
			target: "marks.1.per"
		}, {
			source: "subgroup2",
			target: "marks.1.split"
		}, {
			source: "subset2",
			target: "marks.1.values"
		}, {
			source: "color_by",
			target: "color_by"
		}, {
			source: "legend_order",
			target: "legend.order"
		}, {
			source: "tooltip",
			target: "marks.0.tooltip"
		}],
		chartProperties: [{
			source: "date_format",
			target: "date_format"
		}, {
			source: "x_label",
			target: "x.label"
		}, {
			source: "x_type",
			target: "x.type"
		}, {
			source: "x_format",
			target: "x.format"
		}, {
			source: "x_sort",
			target: "x.sort"
		}, {
			source: "x_bin",
			target: "x.bin"
		}, {
			source: "x_behavior",
			target: "x.behavior"
		}, {
			source: "y_label",
			target: "y.label"
		}, {
			source: "y_type",
			target: "y.type"
		}, {
			source: "y_format",
			target: "y.format"
		}, {
			source: "y_sort",
			target: "y.sort"
		}, {
			source: "y_bin",
			target: "y.bin"
		}, {
			source: "y_behavior",
			target: "y.behavior"
		}, {
			source: "marks_type",
			target: "marks.0.type"
		}, {
			source: "marks_summarizeX",
			target: "marks.0.summarizeX"
		}, {
			source: "marks_summarizeY",
			target: "marks.0.summarizeY"
		}, {
			source: "marks_arrange",
			target: "marks.0.arrange"
		}, {
			source: "marks_fill_opacity",
			target: "marks.0.attributes.fill-opacity"
		}, {
			source: "marks_tooltip",
			target: "marks.0.tooltip"
		}, {
			source: "marks_text",
			target: "marks.0.text"
		}, {
			source: "marks2_type",
			target: "marks.1.type"
		}, {
			source: "marks2_summarizeX",
			target: "marks.1.summarizeX"
		}, {
			source: "marks2_summarizeY",
			target: "marks.1.summarizeY"
		}, {
			source: "marks2_arrange",
			target: "marks.1.arrange"
		}, {
			source: "marks2_fill_opacity",
			target: "marks.1.attributes.fill-opacity"
		}, {
			source: "marks2_tooltip",
			target: "marks.1.tooltip"
		}, {
			source: "marks2_text",
			target: "marks.1.text"
		}, {
			source: "transitions",
			target: "transitions"
		}, {
			source: "aspect_ratio",
			target: "aspect"
		}, {
			source: "range_band",
			target: "range_band"
		}, {
			source: "colors",
			target: "colors"
		}, {
			source: "gridlines",
			target: "gridlines"
		}, {
			source: "max_width",
			target: "max_width"
		}, {
			source: "width",
			target: "width"
		}, {
			source: "height",
			target: "height"
		}, {
			source: "margin_top",
			target: "margin.top"
		}, {
			source: "margin_bottom",
			target: "margin.bottom"
		}, {
			source: "margin_left",
			target: "margin.left"
		}, {
			source: "margin_right",
			target: "margin.right"
		}, {
			source: "resizable",
			target: "resizable"
		}, {
			source: "scale_text",
			target: "scale_text"
		}, {
			source: "legend_mark",
			target: "legend.mark"
		}, {
			source: "legend_label",
			target: "legend.label"
		}, {
			source: "legend_location",
			target: "legend.location"
		}]
	};

	var config = {
	    //Default template settings
	    value_col: 'STRESN',
	    measure_col: 'TEST',
	    unit_col: 'STRESU',
	    normal_col_low: 'STNRLO',
	    normal_col_high: 'STNRHI',
	    id_col: 'USUBJID',
	    filters: [{ value_col: 'SITE', label: 'Site' }, { value_col: 'VISITN', label: 'Visit' }, { value_col: 'SEX', label: 'Sex' }, { value_col: 'RACE', label: 'Race' }],
	    detail_cols: null,
	    start_value: null,
	    rotateX: true,
	    missingValues: ['', 'NA', 'N/A'],

	    //Standard webcharts settings
	    x: {
	        'column': null, // set in syncSettings()
	        'label': null, // set in syncSettings()
	        'type': 'linear',
	        'bin': 25,
	        'behavior': 'flex',
	        'format': '.1f'
	    },
	    y: {
	        'label': '# of Observations',
	        'type': 'linear',
	        'behavior': 'flex',
	        'column': '',
	        'domain': [0, null]
	    },
	    marks: [{
	        'per': [], // set in syncSettings()
	        'type': 'bar',
	        'summarizeY': 'count',
	        'summarizeX': 'mean',
	        'attributes': { 'fill-opacity': 0.75 }
	    }],
	    'aspect': 1.66,
	    'max_width': '800'
	};

	//Replicate settings in multiple places in the settings object
	function syncSettings(settings) {
	    settings.x.label = settings.start_value;
	    settings.x.column = settings.value_col;
	    settings.marks[0].per[0] = settings.value_col;

	    //Set [ settings.detail_cols ] to columns specified in default template settings.
	    if (settings.detail_cols === null) {
	        settings.detail_cols = [settings.id_col];
	        settings.filters.forEach(function (d) {
	            return settings.detail_cols.push(d.value_col);
	        });
	        settings.detail_cols.push(settings.measure_col, settings.value_col, settings.unit_col, settings.normal_col_low, settings.normal_col_high);
	    }

	    return settings;
	}

	//Map values from settings to control inputs
	function syncControlInputs(settings) {
	    var measureFilter = { type: 'subsetter',
	        value_col: settings.measure_col,
	        label: 'Measure',
	        start: null };

	    if (settings.filters && settings.filters.length > 0) {
	        var otherFilters = settings.filters.map(function (d) {
	            return {
	                type: 'subsetter',
	                value_col: d.value_col,
	                label: d.label && /^\s*$/.test(d.label) === false ? d.label : d.value_col };
	        });
	        return [measureFilter].concat(otherFilters);
	    } else return [measureFilter];
	}

	function onInit() {
	    var _this = this;

	    var config = this.config;
	    var allMeasures = d3$1.set(this.raw_data.map(function (m) {
	        return m[config.measure_col];
	    })).values();

	    //Remove filters whose [ value_col ] does not appear in the data.
	    var columns = d3.keys(this.raw_data[0]);
	    this.controls.config.inputs = this.controls.config.inputs.filter(function (d) {
	        return columns.indexOf(d.value_col) > -1;
	    });
	    this.table.config.cols = this.table.config.cols.filter(function (d) {
	        return columns.indexOf(d) > -1;
	    });

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
	    //Add population count.
	    d3.select('.wc-controls').append('div').attr('id', 'populationCount').style('font-style', 'italic');

	    //Add footnote.
	    this.wrap.insert('p', '.wc-chart').attr('class', 'annote').text('Click a bar for details.');

	    //Add control to hide or display normal range(s).
	    var normalRange = d3.select('.wc-controls').append('div').attr('id', 'NRcheckbox').style('margin', '.5em').append('input').attr('type', 'checkbox');
	    var NRcheckbox = document.getElementById('NRcheckbox');
	    NRcheckbox.innerHTML = NRcheckbox.innerHTML + 'Normal range';
	    d3.select('#NRcheckbox input').on('change', function () {
	        d3.selectAll('.normalRange').attr('visibility', d3.select(this).property('checked') ? 'visible' : 'hidden');
	    });
	}

	function onPreprocess() {
	    //Capture currently selected filters.
	    var filterSettings = [];
	    var filters = d3.selectAll('.wc-controls .changer').each(function (d) {
	        filterSettings.push({ value_col: d.value_col,
	            value: d3.select(this).selectAll('option').filter(function (d1) {
	                return d3.select(this).property('selected');
	            }).property('value') });
	    });
	    //Filter data based on currently selected filters.
	    var filtered_data = this.raw_data.filter(function (d) {
	        var match = true;
	        filterSettings.forEach(function (d1) {
	            if (match === true) match = d[d1.value_col] === d1.value || d1.value === 'All';
	        });
	        return match;
	    });
	    //Set x domain based on currently filtered data.
	    this.config.x.domain = d3.extent(filtered_data, function (d) {
	        return +d[settings.value_col];
	    });
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

	// Takes a webcharts object creates a text annotation giving the 
	// number and percentage of observations shown in the current view 
	// inputs:
	// chart - a webcharts chart object
	// id_col - a column name in the raw data set (chart.raw_data) representing the observation of interest
	// id_unit - a text string to label the units in the annotation (default = "participants")
	// selector - css selector for the annotation
	function updateSubjectCount(chart, id_col, selector, id_unit) {
	    //count the number of unique ids in the data set
	    var totalObs = d3.set(chart.raw_data.map(function (d) {
	        return d[id_col];
	    })).values().length;

	    //count the number of unique ids in the current chart and calculate the percentage
	    var currentObs = d3.set(chart.filtered_data.map(function (d) {
	        return d[id_col];
	    })).values().length;
	    var percentage = d3.format('0.1%')(currentObs / totalObs);

	    //clear the annotation
	    var annotation = d3.select(selector);
	    d3.select(selector).selectAll("*").remove();

	    //update the annotation
	    var units = id_unit ? " " + id_unit : " participant(s)";
	    annotation.text('\n' + currentObs + " of " + totalObs + units + " shown (" + percentage + ")");
	}

	function onDraw() {
	    updateSubjectCount(this, this.config.id_col, '#populationCount');
	}

	function onResize() {
	    var chart = this;
	    var config = this.config;
	    var measure = this.filtered_data[0] ? this.filtered_data[0][this.config.measure_col] : this.raw_data[0][this.config.measure_col];
	    var units = this.filtered_data[0] ? this.filtered_data[0][this.config.unit_col] : this.raw_data[0][this.config.unit_col];

	    var listing = this.table;

	    //Display data listing on bin click.
	    var cleanF = d3$1.format('.3f');
	    var bins = this.svg.selectAll('.bar');
	    var footnote = this.wrap.select('.annote');

	    bins.style('cursor', 'pointer').on('click', function (d) {
	        footnote.classed('tableTitle', true).text('Table displays ' + d.values.raw.length + ' records with ' + measure + ' values from ' + cleanF(d.rangeLow) + ' to ' + cleanF(d.rangeHigh) + ' ' + units + '. Click outside a bar to remove details.');
	        listing.draw(d.values.raw);
	        d3.select('.listing table').style({ 'border-collapse': 'separate',
	            'background': '#fff',
	            'border-radius': '5px',
	            'margin': '50px auto' });
	        d3.select('.wc-chart thead').style('border-radius', '5px');
	        d3.selectAll('.wc-chart thead th').style({ 'font-size': '16px',
	            'font-weight': '400',
	            'color': '#111',
	            'text-align': 'left',
	            'padding': '10px',
	            'background': '#bdbdbd',
	            'border-top': '1px solid #858d99',
	            'border-bottom': '1px solid #858d99' });
	        d3.selectAll('.wc-chart tbody tr td').style({ 'font-weight': '400',
	            'color': '#5f6062',
	            'font-size': '13px',
	            'padding': '20px 20px 20px 20px',
	            'border-bottom': '1px solid #e0e0e0' });
	        d3.selectAll('tbody tr:nth-child(2n)').style('background', '#f0f3f5');
	        bins.attr('fill-opacity', 0.5);
	        d3$1.select(this).attr('fill-opacity', 1);
	    }).on('mouseover', function (d) {
	        if (footnote.classed('tableTitle') === false) {
	            footnote.text(d.values.raw.length + ' records with ' + measure + ' values from ' + cleanF(d.rangeLow) + ' to ' + cleanF(d.rangeHigh) + ' ' + units + '.');
	        }
	    }).on('mouseout', function (d) {
	        if (footnote.classed('tableTitle') === false) {
	            footnote.text('Click a bar for details.');
	        }
	    });

	    //Visualize normal ranges.
	    if (this.raw_data[0][settings.normal_col_low] && this.raw_data[0][settings.normal_col_high]) {
	        //Capture distinct normal ranges in filtered data.
	        var normalRanges = d3.nest().key(function (d) {
	            return d[settings.normal_col_low] + ',' + d[settings.normal_col_high];
	        }) // set key to comma-delimited normal range
	        .rollup(function (d) {
	            return d.length;
	        }).entries(this.filtered_data);
	        var currentRange = d3.extent(this.filtered_data, function (d) {
	            return +d[settings.value_col];
	        });
	        //Sort normal ranges so larger normal ranges plot beneath smaller normal ranges.
	        normalRanges.sort(function (a, b) {
	            var a_lo = a.key.split(',')[0];
	            var a_hi = a.key.split(',')[1];
	            var b_lo = b.key.split(',')[0];
	            var b_hi = b.key.split(',')[1];
	            return a_lo <= b_lo && a_hi >= b_hi ? 2 : // lesser minimum and greater maximum
	            a_lo >= b_lo && a_hi <= b_hi ? -2 : // greater minimum and lesser maximum 
	            a_lo <= b_lo && a_hi <= b_hi ? 1 : // lesser minimum and lesser maximum
	            a_lo >= b_lo && a_hi >= b_hi ? -1 : // greater minimum and greater maximum 
	            1;
	        });
	        //Determine whether normal range checkbox is checked.
	        var displayNormalRange = d3.select('#NRcheckbox input').property('checked');
	        //Add divs to chart for each normal range.
	        var canvas = d3.select('.bar-supergroup');
	        canvas.selectAll('.normalRange').remove();
	        canvas.selectAll('.normalRange rect').data(normalRanges).enter().insert('rect', ':first-child').attr({ 'class': 'normalRange',
	            'x': function x(d) {
	                return chart.x(Math.max(+d.key.split(',')[0], currentRange[0]));
	            } // set x to range low
	            , 'y': 0,
	            'width': function width(d) {
	                return Math.min(chart.plot_width - chart.x(Math.max(+d.key.split(',')[0], currentRange[0])), // chart width - range low

	                chart.x(+d.key.split(',')[1]) - chart.x(Math.max(+d.key.split(',')[0], currentRange[0])));
	            } // range high - range low

	            , 'height': this.plot_height,
	            'visibility': displayNormalRange ? 'visible' : 'hidden' }).style({ 'stroke': 'black',
	            'fill': 'black',
	            'stroke-opacity': function strokeOpacity(d) {
	                return d.values / chart.filtered_data.length * .75;
	            } // opacity as a function of fraction of records with the given normal range
	            , 'fill-opacity': function fillOpacity(d) {
	                return d.values / chart.filtered_data.length * .5;
	            } }) // opacity as a function of fraction of records with the given normal range
	        .append('title').text(function (d) {
	            return 'Normal range: ' + d.key.split(',')[0] + "-" + d.key.split(',')[1] + " " + units + ' (' + d3.format('%')(d.values / chart.filtered_data.length) + ' of records)';
	        });
	    }

	    d3.selectAll('.overlay, .normalRange').on('click', function () {
	        listing.draw([]);
	        bins.attr('fill-opacity', 0.75);

	        if (footnote.classed('tableTitle')) {
	            footnote.classed('tableTitle', false).text('Click a bar for details.');
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

	function safetyHistogram(element, settings) {
	  //Merge user's settings with default settings.
	  var mergedSettings = Object.assign({}, config, settings);

	  //Keep settings in sync with the data mappings.
	  mergedSettings = syncSettings(mergedSettings);

	  //Keep control inputs in sync and create controls object.
	  var syncedControlInputs = syncControlInputs(mergedSettings);
	  var controls = webcharts.createControls(element, { location: 'top', inputs: syncedControlInputs });

	  //Define chart
	  var chart = webcharts.createChart(element, mergedSettings, controls);
	  chart.on('init', onInit);
	  chart.on('layout', onLayout);
	  chart.on('preprocess', onPreprocess);
	  chart.on('datatransform', onDataTransform);
	  chart.on('draw', onDraw);
	  chart.on('resize', onResize);

	  var table = webcharts.createTable(element, mergedSettings.detail_cols && mergedSettings.detail_cols.length > 0 ? { cols: mergedSettings.detail_cols } : null).init([]);
	  chart.table = table;

	  return chart;
	}

	var asyncGenerator = function () {
	  function AwaitValue(value) {
	    this.value = value;
	  }

	  function AsyncGenerator(gen) {
	    var front, back;

	    function send(key, arg) {
	      return new Promise(function (resolve, reject) {
	        var request = {
	          key: key,
	          arg: arg,
	          resolve: resolve,
	          reject: reject,
	          next: null
	        };

	        if (back) {
	          back = back.next = request;
	        } else {
	          front = back = request;
	          resume(key, arg);
	        }
	      });
	    }

	    function resume(key, arg) {
	      try {
	        var result = gen[key](arg);
	        var value = result.value;

	        if (value instanceof AwaitValue) {
	          Promise.resolve(value.value).then(function (arg) {
	            resume("next", arg);
	          }, function (arg) {
	            resume("throw", arg);
	          });
	        } else {
	          settle(result.done ? "return" : "normal", result.value);
	        }
	      } catch (err) {
	        settle("throw", err);
	      }
	    }

	    function settle(type, value) {
	      switch (type) {
	        case "return":
	          front.resolve({
	            value: value,
	            done: true
	          });
	          break;

	        case "throw":
	          front.reject(value);
	          break;

	        default:
	          front.resolve({
	            value: value,
	            done: false
	          });
	          break;
	      }

	      front = front.next;

	      if (front) {
	        resume(front.key, front.arg);
	      } else {
	        back = null;
	      }
	    }

	    this._invoke = send;

	    if (typeof gen.return !== "function") {
	      this.return = undefined;
	    }
	  }

	  if (typeof Symbol === "function" && Symbol.asyncIterator) {
	    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
	      return this;
	    };
	  }

	  AsyncGenerator.prototype.next = function (arg) {
	    return this._invoke("next", arg);
	  };

	  AsyncGenerator.prototype.throw = function (arg) {
	    return this._invoke("throw", arg);
	  };

	  AsyncGenerator.prototype.return = function (arg) {
	    return this._invoke("return", arg);
	  };

	  return {
	    wrap: function (fn) {
	      return function () {
	        return new AsyncGenerator(fn.apply(this, arguments));
	      };
	    },
	    await: function (value) {
	      return new AwaitValue(value);
	    }
	  };
	}();

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var ReactYourProjectName = function (_React$Component) {
		inherits(ReactYourProjectName, _React$Component);

		function ReactYourProjectName(props) {
			classCallCheck(this, ReactYourProjectName);

			var _this = possibleConstructorReturn(this, (ReactYourProjectName.__proto__ || Object.getPrototypeOf(ReactYourProjectName)).call(this, props));

			_this.state = {};
			return _this;
		}

		createClass(ReactYourProjectName, [{
			key: 'componentDidMount',
			value: function componentDidMount(prevProps, prevState) {
				if (this.props.data.length) {
					//manually clear div and redraw
					d3$1.select('.chart-div.id-' + this.props.id).selectAll('*').remove();
					var chart = safetyHistogram('.chart-div.id-' + this.props.id, this.props.settings).init(this.props.data);
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps, prevState) {
				if (this.props.data.length) {
					//manually clear div and redraw
					d3$1.select('.chart-div.id-' + this.props.id).selectAll('*').remove();
					var chart = safetyHistogram('.chart-div.id-' + this.props.id, this.props.settings).init(this.props.data);
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
		return ReactYourProjectName;
	}(React.Component);

	ReactYourProjectName.defaultProps = { data: [], controlInputs: [], id: 'id' };

	function describeCode(props) {
	  var settings = this.createSettings(props);
	  var code = '// uses d3 v.' + d3$1.version + '\n// uses webcharts v.' + webcharts.version + '\n// uses safety-histogram v.1.2.0\n\nvar settings = ' + JSON.stringify(settings, null, 2) + ';\n\nvar myChart = safetyHistogram(dataElement, settings);\n\nd3.csv(dataPath, function(error, csv) {\n  myChart.init(csv);\n});\n';
	  return code;
	}

	var Renderer = function (_React$Component) {
	  inherits(Renderer, _React$Component);

	  function Renderer(props) {
	    classCallCheck(this, Renderer);

	    var _this = possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, props));

	    _this.binding = binding;
	    _this.describeCode = describeCode.bind(_this);
	    _this.state = { data: [], settings: {}, template: {}, loadMsg: 'Loading...' };
	    return _this;
	  }

	  createClass(Renderer, [{
	    key: 'createSettings',
	    value: function createSettings(props) {
	      // set placeholders for anything the user can change
	      var shell = config;

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

	      return syncSettings(shell);
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
	      return React.createElement(ReactYourProjectName, {
	        id: this.props.id,
	        settings: this.state.settings,
	        controlInputs: this.props.template.controls,
	        data: this.props.data
	      });
	    }
	  }]);
	  return Renderer;
	}(React.Component);

	return Renderer;

}));