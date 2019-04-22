(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('d3'), require('webcharts')))
        : typeof define === 'function' && define.amd
            ? define(['d3', 'webcharts'], factory)
            : (global.safetyHistogram = factory(global.d3, global.webCharts));
})(this, function(d3, webcharts) {
    'use strict';

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {
                if (target == null) {
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) {
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true
        });
    }

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, 'length')).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }

    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return -1.
                return -1;
            }
        });
    }

    Math.log10 = Math.log10 =
        Math.log10 ||
        function(x) {
            return Math.log(x) * Math.LOG10E;
        };

    function rendererSettings() {
        return {
            //required variables
            id_col: 'USUBJID',
            measure_col: 'TEST',
            unit_col: 'STRESU',
            value_col: 'STRESN',
            normal_col_low: 'STNRLO',
            normal_col_high: 'STNRHI',

            //optional variables
            filters: null,
            details: null,

            //miscellaneous settings
            start_value: null,
            normal_range: true,
            displayNormalRange: false
        };
    }

    function webchartsSettings() {
        return {
            //chart settings
            x: {
                type: 'linear',
                column: null, // set in syncSettings()
                label: null, // set in syncSettings()
                domain: [null, null], // set in preprocess callback
                format: null, // set in preprocess callback
                bin: 25
            },
            y: {
                type: 'linear',
                column: null,
                label: '# of Observations',
                domain: [0, null],
                format: '1d',
                behavior: 'flex'
            },
            marks: [
                {
                    per: [], // set in syncSettings()
                    type: 'bar',
                    summarizeY: 'count',
                    summarizeX: 'mean',
                    attributes: { 'fill-opacity': 0.75 }
                }
            ],
            aspect: 3
        };
    }

    function syncSettings(settings) {
        settings.x.label = settings.start_value;
        settings.x.column = settings.value_col;
        settings.marks[0].per[0] = settings.value_col;

        if (!settings.normal_range) {
            settings.normal_col_low = null;
            settings.normal_col_high = null;
        }

        //Define default details.
        var defaultDetails = [{ value_col: settings.id_col, label: 'Subject Identifier' }];
        if (settings.filters)
            settings.filters.forEach(function(filter) {
                return defaultDetails.push({
                    value_col: filter.value_col ? filter.value_col : filter,
                    label: filter.label
                        ? filter.label
                        : filter.value_col
                            ? filter.value_col
                            : filter
                });
            });
        defaultDetails.push({ value_col: settings.value_col, label: 'Result' });
        if (settings.normal_col_low)
            defaultDetails.push({
                value_col: settings.normal_col_low,
                label: 'Lower Limit of Normal'
            });
        if (settings.normal_col_high)
            defaultDetails.push({
                value_col: settings.normal_col_high,
                label: 'Upper Limit of Normal'
            });

        //If [settings.details] is not specified:
        if (!settings.details) settings.details = defaultDetails;
        else {
            //If [settings.details] is specified:
            //Allow user to specify an array of columns or an array of objects with a column property
            //and optionally a column label.
            settings.details.forEach(function(detail) {
                if (
                    defaultDetails
                        .map(function(d) {
                            return d.value_col;
                        })
                        .indexOf(detail.value_col ? detail.value_col : detail) === -1
                )
                    defaultDetails.push({
                        value_col: detail.value_col ? detail.value_col : detail,
                        label: detail.label
                            ? detail.label
                            : detail.value_col
                                ? detail.value_col
                                : detail
                    });
            });
            settings.details = defaultDetails;
        }

        return settings;
    }

    function controlInputs() {
        return [
            {
                type: 'subsetter',
                value_col: 'sh_measure',
                label: 'Measure',
                start: null // set in ../callbacks/onInit/checkControls/updateMeasureFilter
            },
            {
                type: 'number',
                option: 'x.domain[0]',
                label: 'Lower',
                require: true
            },
            {
                type: 'number',
                option: 'x.domain[1]',
                label: 'Upper',
                require: true
            },
            {
                type: 'checkbox',
                option: 'displayNormalRange',
                label: 'Normal Range'
            }
        ];
    }

    function syncControlInputs(controlInputs, settings) {
        //Add filters to default controls.
        if (Array.isArray(settings.filters) && settings.filters.length > 0) {
            var position = controlInputs.findIndex(function(input) {
                return input.label === 'Normal Range';
            });
            settings.filters.forEach(function(filter) {
                var filterObj = {
                    type: 'subsetter',
                    value_col: filter.value_col || filter,
                    label: filter.label || filter.value_col || filter
                };
                controlInputs.splice(position, 0, filterObj);
                ++position;
            });
        }

        return controlInputs;
    }

    var configuration = {
        rendererSettings: rendererSettings,
        webchartsSettings: webchartsSettings,
        settings: Object.assign({}, rendererSettings(), webchartsSettings()),
        syncSettings: syncSettings,
        controlInputs: controlInputs,
        syncControlInputs: syncControlInputs
    };

    function countParticipants() {
        var _this = this;

        this.participantCount = {
            N: d3
                .set(
                    this.raw_data.map(function(d) {
                        return d[_this.config.id_col];
                    })
                )
                .values()
                .filter(function(value) {
                    return !/^\s*$/.test(value);
                }).length,
            container: null, // set in ../onLayout/addParticipantCountContainer
            n: null, // set in ../onDraw/updateParticipantCount
            percentage: null // set in ../onDraw/updateParticipantCount
        };
    }

    function removeMissingResults() {
        var _this = this;

        //Split data into records with missing and nonmissing results.
        var missingResults = [];
        var nonMissingResults = [];
        this.raw_data.forEach(function(d) {
            if (/^\s*$/.test(d[_this.config.value_col])) missingResults.push(d);
            else nonMissingResults.push(d);
        });

        //Nest missing and nonmissing results by participant.
        var participantsWithMissingResults = d3
            .nest()
            .key(function(d) {
                return d[_this.config.id_col];
            })
            .rollup(function(d) {
                return d.length;
            })
            .entries(missingResults);
        var participantsWithNonMissingResults = d3
            .nest()
            .key(function(d) {
                return d[_this.config.id_col];
            })
            .rollup(function(d) {
                return d.length;
            })
            .entries(nonMissingResults);

        //Identify placeholder records, i.e. participants with a single missing result.
        this.removedRecords.placeholderRecords = participantsWithMissingResults
            .filter(function(d) {
                return (
                    participantsWithNonMissingResults
                        .map(function(d) {
                            return d.key;
                        })
                        .indexOf(d.key) < 0 && d.values === 1
                );
            })
            .map(function(d) {
                return d.key;
            });
        if (this.removedRecords.placeholderRecords.length)
            console.log(
                this.removedRecords.placeholderRecords.length +
                    ' participants without results have been detected.'
            );

        //Count the number of records with missing results.
        this.removedRecords.missing = d3.sum(
            participantsWithMissingResults.filter(function(d) {
                return _this.removedRecords.placeholderRecords.indexOf(d.key) < 0;
            }),
            function(d) {
                return d.values;
            }
        );
        if (this.removedRecords.missing > 0)
            console.warn(
                this.removedRecords.missing +
                    ' record' +
                    (this.removedRecords.missing > 1
                        ? 's with a missing result have'
                        : ' with a missing result has') +
                    ' been removed.'
            );

        //Update data.
        this.raw_data = nonMissingResults;
    }

    function removeNonNumericResults() {
        var _this = this;

        //Filter out non-numeric results.
        var numericResults = this.raw_data.filter(function(d) {
            return /^-?[0-9.]+$/.test(d[_this.config.value_col]);
        });
        this.removedRecords.nonNumeric = this.raw_data.length - numericResults.length;
        if (this.removedRecords.nonNumeric > 0)
            console.warn(
                this.removedRecords.nonNumeric +
                    ' record' +
                    (this.removedRecords.nonNumeric > 1
                        ? 's with a non-numeric result have'
                        : ' with a non-numeric result has') +
                    ' been removed.'
            );

        //Update data.
        this.raw_data = numericResults;
    }

    function cleanData() {
        this.removedRecords = {
            placeholderParticipants: null, // defined in './cleanData/removeMissingResults
            missing: null, // defined in './cleanData/removeMissingResults
            nonNumeric: null, // defined in './cleanData/removeNonNumericResults
            container: null // defined in ../onLayout/addRemovedRecordsContainer
        };
        removeMissingResults.call(this);
        removeNonNumericResults.call(this);
        this.initial_data = this.raw_data;
    }

    function addVariables() {
        var _this = this;

        this.raw_data.forEach(function(d) {
            //Concatenate unit to measure if provided.
            d[_this.config.measure_col] = d[_this.config.measure_col].trim();
            d.sh_measure = d.hasOwnProperty(_this.config.unit_col)
                ? d[_this.config.measure_col] + ' (' + d[_this.config.unit_col] + ')'
                : d[_this.config.measure_col];
        });
    }

    function participant() {
        var _this = this;

        this.participants = d3
            .set(
                this.initial_data.map(function(d) {
                    return d[_this.config.id_col];
                })
            )
            .values()
            .sort();
    }

    function measure() {
        var _this = this;

        this.measures = d3
            .set(
                this.initial_data.map(function(d) {
                    return d[_this.config.measure_col];
                })
            )
            .values()
            .sort();
        this.sh_measures = d3
            .set(
                this.initial_data.map(function(d) {
                    return d.sh_measure;
                })
            )
            .values()
            .sort();
    }

    function defineSets() {
        participant.call(this);
        measure.call(this);
    }

    function updateMeasureFilter() {
        this.measure = {};
        var measureInput = this.controls.config.inputs.find(function(input) {
            return input.label === 'Measure';
        });
        if (
            this.config.start_value &&
            this.sh_measures.indexOf(this.config.start_value) < 0 &&
            this.measures.indexOf(this.config.start_value) < 0
        ) {
            measureInput.start = this.sh_measures[0];
            console.warn(
                this.config.start_value +
                    ' is an invalid measure. Defaulting to ' +
                    measureInput.start +
                    '.'
            );
        } else if (
            this.config.start_value &&
            this.sh_measures.indexOf(this.config.start_value) < 0
        ) {
            measureInput.start = this.sh_measures[this.measures.indexOf(this.config.start_value)];
            console.warn(
                this.config.start_value +
                    ' is missing the units value. Defaulting to ' +
                    measureInput.start +
                    '.'
            );
        } else measureInput.start = this.config.start_value || this.sh_measures[0];
    }

    function removeFilters() {
        var _this = this;

        this.controls.config.inputs = this.controls.config.inputs.filter(function(input) {
            if (input.type !== 'subsetter' || input.value_col === 'soe_measure') {
                return true;
            } else if (!_this.raw_data[0].hasOwnProperty(input.value_col)) {
                console.warn(
                    'The [ ' +
                        input.label +
                        ' ] filter has been removed because the variable does not exist.'
                );
            } else {
                var levels = d3
                    .set(
                        _this.raw_data.map(function(d) {
                            return d[input.value_col];
                        })
                    )
                    .values();

                if (levels.length === 1)
                    console.warn(
                        'The [ ' +
                            input.label +
                            ' ] filter has been removed because the variable has only one level.'
                    );

                return levels.length > 1;
            }
        });
    }

    function checkControls() {
        updateMeasureFilter.call(this);
        removeFilters.call(this);
    }

    function onInit() {
        // 1. Count total participants prior to data cleaning.
        countParticipants.call(this);

        // 2. Drop missing values and remove measures with any non-numeric results.
        cleanData.call(this);

        // 3. Define additional variables.
        addVariables.call(this);

        // 4. Define sets.
        defineSets.call(this);

        // 5. Check controls.
        checkControls.call(this);
    }

    function identifyControls() {
        var controlGroups = this.controls.wrap
            .style('padding-bottom', '8px')
            .selectAll('.control-group');

        //Give each control a unique ID.
        controlGroups
            .attr('id', function(d) {
                return d.label.toLowerCase().replace(' ', '-');
            })
            .each(function(d) {
                d3.select(this).classed(d.type, true);
            });

        //Give x-axis controls a common class name.
        controlGroups
            .filter(function(d) {
                return ['x.domain[0]', 'x.domain[1]'].indexOf(d.option) > -1;
            })
            .classed('x-axis', true);
    }

    function addXdomainResetButton() {
        var _this = this;

        //Add x-domain reset button container.
        var resetContainer = this.controls.wrap
            .insert('div', '#lower')
            .classed('control-group x-axis', true)
            .datum({
                type: 'button',
                option: 'x.domain',
                label: ''
            })
            .style('vertical-align', 'bottom');

        //Add label.
        resetContainer
            .append('span')
            .attr('class', 'wc-control-label')
            .style('text-align', 'right')
            .text('Limits');

        //Add button.
        resetContainer
            .append('button')
            .text(' Reset ')
            .style('padding', '0px 5px')
            .on('click', function() {
                _this.config.x.domain = _this.measure.domain;

                _this.controls.wrap
                    .selectAll('.control-group')
                    .filter(function(f) {
                        return f.option === 'x.domain[0]';
                    })
                    .select('input')
                    .property('value', _this.config.x.domain[0]);

                _this.controls.wrap
                    .selectAll('.control-group')
                    .filter(function(f) {
                        return f.option === 'x.domain[1]';
                    })
                    .select('input')
                    .property('value', _this.config.x.domain[1]);

                _this.draw();
            });
    }

    function insertGrouping(selector, label) {
        var grouping = this.controls.wrap
            .insert('div', selector)
            .style({
                display: 'inline-block',
                'margin-right': '5px'
            })
            .append('fieldset')
            .style('padding', '0px 2px');
        grouping.append('legend').text(label);
        this.controls.wrap.selectAll(selector).each(function(d) {
            this.style.marginTop = '0px';
            this.style.marginRight = '2px';
            this.style.marginBottom = '2px';
            this.style.marginLeft = '2px';
            grouping.node().appendChild(this);
        });
    }

    function groupControls() {
        //Group x-axis controls.
        insertGrouping.call(this, '.x-axis', 'X-axis');

        //Group filters.
        if (this.filters.length > 1)
            insertGrouping.call(this, '.subsetter:not(#measure)', 'Filters');
    }

    function addParticipantCountContainer() {
        this.participantCount.container = this.controls.wrap
            .style('position', 'relative')
            .append('div')
            .attr('id', 'participant-count')
            .style({
                position: 'absolute',
                'font-style': 'italic',
                bottom: '-10px',
                left: 0
            });
    }

    function addRemovedRecordsNote() {
        var _this = this;

        if (this.removedRecords.missing > 0 || this.removedRecords.nonNumeric > 0) {
            var message =
                this.removedRecords.missing > 0 && this.removedRecords.nonNumeric > 0
                    ? this.removedRecords.missing +
                      ' record' +
                      (this.removedRecords.missing > 1 ? 's' : '') +
                      ' with a missing result and ' +
                      this.removedRecords.nonNumeric +
                      ' record' +
                      (this.removedRecords.nonNumeric > 1 ? 's' : '') +
                      ' with a non-numeric result were removed.'
                    : this.removedRecords.missing > 0
                        ? this.removedRecords.missing +
                          ' record' +
                          (this.removedRecords.missing > 1 ? 's' : '') +
                          ' with a missing result ' +
                          (this.removedRecords.missing > 1 ? 'were' : 'was') +
                          ' removed.'
                        : this.removedRecords.nonNumeric > 0
                            ? this.removedRecords.nonNumeric +
                              ' record' +
                              (this.removedRecords.nonNumeric > 1 ? 's' : '') +
                              ' with a non-numeric result ' +
                              (this.removedRecords.nonNumeric > 1 ? 'were' : 'was') +
                              ' removed.'
                            : '';
            this.removedRecords.container = this.controls.wrap
                .append('div')
                .style({
                    position: 'absolute',
                    'font-style': 'italic',
                    bottom: '-10px',
                    right: 0
                })
                .text(message);
            this.removedRecords.container
                .append('span')
                .style({
                    color: 'blue',
                    'text-decoration': 'underline',
                    'font-style': 'normal',
                    'font-weight': 'bold',
                    cursor: 'pointer',
                    'font-size': '16px',
                    'margin-left': '5px'
                })
                .html('<sup>x</sup>')
                .on('click', function() {
                    return _this.removedRecords.container.style('display', 'none');
                });
        }
    }

    function addBorderAboveChart() {
        this.wrap.style({
            'border-top': '1px solid #ccc'
        });
    }

    function addFootnoteContainer() {
        this.wrap
            .insert('p', '.wc-chart')
            .attr('class', 'annote')
            .style({
                'border-top': '1px solid #ccc',
                'padding-top': '10px'
            })
            .text('Click a bar for details.');
    }

    function onLayout() {
        identifyControls.call(this);
        addXdomainResetButton.call(this);
        groupControls.call(this);
        addParticipantCountContainer.call(this);
        addRemovedRecordsNote.call(this);
        addBorderAboveChart.call(this);
        addFootnoteContainer.call(this);
    }

    function getCurrentMeasure() {
        this.measure.previous = this.measure.current;
        this.measure.current = this.controls.wrap.selectAll('#measure option:checked').text();
    }

    function defineMeasureData() {
        var _this = this;

        this.measure.data = this.initial_data.filter(function(d) {
            return d.sh_measure === _this.measure.current;
        });
        this.measure.unit =
            this.config.unit_col && this.measure.data[0].hasOwnProperty(this.config.unit_col)
                ? this.measure.data[0][this.config.unit_col]
                : null;
        this.measure.results = this.measure.data
            .map(function(d) {
                return +d[_this.config.value_col];
            })
            .sort(function(a, b) {
                return a - b;
            });
        this.measure.domain = d3.extent(this.measure.results);
        this.measure.range = this.measure.domain[1] - this.measure.domain[0];
        this.measure.log10range = Math.log10(this.measure.range);
        this.raw_data = this.measure.data.slice();
    }

    function setXdomain() {
        if (this.measure.current !== this.measure.previous)
            this.config.x.domain = this.measure.domain;
        else if (this.config.x.domain[0] > this.config.x.domain[1]) this.config.x.domain.reverse();
    }

    function calculateXPrecision() {
        //define the precision of the x-axis
        this.config.x.precisionFactor = Math.round(this.measure.log10range);
        this.config.x.precision = Math.pow(10, this.config.x.precisionFactor);

        //x-axis format
        this.config.x.format =
            this.config.x.precisionFactor > 0
                ? '.0f'
                : '.' + (Math.abs(this.config.x.precisionFactor) + 1) + 'f';
        this.config.x.d3format = d3.format(this.config.x.format);

        //one more precision please: bin format
        this.config.x.format1 =
            this.config.x.precisionFactor > 0
                ? '.1f'
                : '.' + (Math.abs(this.config.x.precisionFactor) + 2) + 'f';
        this.config.x.d3format1 = d3.format(this.config.x.format1);

        //define the size of the x-axis limit increments
        var step = this.measure.range / 15;
        if (step < 1) {
            var x10 = 0;
            do {
                step = step * 10;
                ++x10;
            } while (step < 1);
            step = Math.round(step) / Math.pow(10, x10);
        } else step = Math.round(step);
        this.measure.step = step;
    }

    function setYaxisLabel() {
        this.config.x.label = this.measure.current;
    }

    function updateXaxisLimitControls() {
        this.controls.wrap
            .selectAll('#lower input')
            .attr('step', this.measure.step) // set in ./calculateXPrecision
            .style('box-shadow', 'none')
            .property('value', this.config.x.domain[0]);

        this.controls.wrap
            .selectAll('#upper input')
            .attr('step', this.measure.step) // set in ./calculateXPrecision
            .style('box-shadow', 'none')
            .property('value', this.config.x.domain[1]);
    }

    function updateXaxisResetButton() {
        //Update tooltip of x-axis domain reset button.
        if (this.currentMeasure !== this.previousMeasure)
            this.controls.wrap
                .selectAll('.x-axis')
                .property(
                    'title',
                    'Initial Limits: [' +
                        this.config.x.domain[0] +
                        ' - ' +
                        this.config.x.domain[1] +
                        ']'
                );
    }

    function onPreprocess() {
        // 1. Capture currently selected measure.
        getCurrentMeasure.call(this);

        // 2. Filter data on currently selected measure.
        defineMeasureData.call(this);

        // 3a Set x-domain given currently selected measure.
        setXdomain.call(this);

        // 3b Define precision of measure.
        calculateXPrecision.call(this);

        // 3c Set x-axis label to current measure.
        setYaxisLabel.call(this);

        // 4a Update x-axis reset button when measure changes.
        updateXaxisResetButton.call(this);

        // 4b Update x-axis limit controls to match x-axis domain.
        updateXaxisLimitControls.call(this);
    }

    function onDatatransform() {}

    function updateParticipantCount() {
        var _this = this;

        //count the number of unique ids in the current chart and calculate the percentage
        this.participantCount.n = d3
            .set(
                this.filtered_data.map(function(d) {
                    return d[_this.config.id_col];
                })
            )
            .values().length;
        this.participantCount.percentage = d3.format('0.1%')(
            this.participantCount.n / this.participantCount.N
        );

        //clear the annotation
        this.participantCount.container.selectAll('*').remove();

        //update the annotation
        this.participantCount.container.text(
            '\n' +
                this.participantCount.n +
                ' of ' +
                this.participantCount.N +
                ' participant(s) shown (' +
                this.participantCount.percentage +
                ')'
        );
    }

    function resetRenderer() {
        //Reset listing.
        this.listing.draw([]);
        this.listing.wrap.selectAll('*').style('display', 'none');

        //Reset footnote.
        this.wrap
            .select('.annote')
            .classed('tableTitle', false)
            .text('Click a bar for details.');

        //Reset bar highlighting.
        delete this.highlightedBin;
        this.svg.selectAll('.bar').attr('opacity', 1);
    }

    function onDraw() {
        updateParticipantCount.call(this);
        resetRenderer.call(this);
    }

    function handleSingleObservation() {
        this.svg.select('#custom-bin').remove();
        if (this.current_data.length === 1) {
            var datum = this.current_data[0];
            this.svg
                .append('g')
                .classed('bar-group', true)
                .attr('id', 'custom-bin')
                .append('rect')
                .data([datum])
                .classed('wc-data-mark bar', true)
                .attr({
                    y: 0,
                    height: this.plot_height,
                    'shape-rendering': 'crispEdges',
                    stroke: 'rgb(102,194,165)',
                    fill: 'rgb(102,194,165)',
                    'fill-opacity': '0.75',
                    width: this.x(datum.values.x * 1.01) - this.x(datum.values.x * 0.99),
                    x: this.x(datum.values.x * 0.99)
                });
        }
    }

    function addBinEventListeners() {
        var chart = this;
        var config = this.config;
        var bins = this.svg.selectAll('.bar');
        var footnote = this.wrap.select('.annote');

        bins.style('cursor', 'pointer')
            .on('mouseover', function(d) {
                //Update footnote.
                if (footnote.classed('tableTitle') === false)
                    footnote.text(
                        d.values.raw.length +
                            ' records with ' +
                            (chart.measure.current + ' values from ') +
                            (chart.config.x.d3format1(d.rangeLow) +
                                ' to ' +
                                chart.config.x.d3format1(d.rangeHigh))
                    );
            })
            .on('mouseout', function(d) {
                //Update footnote.
                if (footnote.classed('tableTitle') === false)
                    footnote.text('Click a bar for details.');
            })
            .on('click', function(d) {
                chart.highlightedBin = d.key;
                //Update footnote.
                footnote
                    .classed('tableTitle', true)
                    .text(
                        'Table displays ' +
                            d.values.raw.length +
                            ' records with ' +
                            (chart.measure.current + ' values from ') +
                            (chart.config.x.d3format1(d.rangeLow) +
                                ' to ' +
                                chart.config.x.d3format1(d.rangeHigh) +
                                '. Click outside a bar to remove details.')
                    );

                //Draw listing.
                chart.listing.draw(d.values.raw);
                chart.listing.wrap.selectAll('*').style('display', null);

                //Reduce bin opacity and highlight selected bin.
                bins.attr('fill-opacity', 0.5);
                d3.select(this).attr('fill-opacity', 1);
            });
    }

    function drawNormalRanges() {
        var chart = this;
        var config = this.config;
        var normalRangeControl = this.controls.wrap.selectAll('.control-group').filter(function(d) {
            return d.label === 'Normal Range';
        });

        if (config.normal_range) {
            if (chart.config.displayNormalRange) drawNormalRanges(chart);
            else chart.wrap.selectAll('.normalRange').remove();

            normalRangeControl.on('change', function() {
                chart.config.displayNormalRange = d3
                    .select(this)
                    .select('input')
                    .property('checked');

                if (chart.config.displayNormalRange) drawNormalRanges(chart);
                else chart.wrap.selectAll('.normalRange').remove();
            });
        } else normalRangeControl.style('display', 'none');

        function drawNormalRanges() {
            //Clear normal ranges.
            var canvas = chart.svg;
            canvas.selectAll('.normalRange').remove();

            //Capture distinct normal ranges in filtered data.
            var normalRanges = d3
                .nest()
                .key(function(d) {
                    return d[chart.config.normal_col_low] + ',' + d[chart.config.normal_col_high];
                }) // set key to comma-delimited normal range
                .rollup(function(d) {
                    return d.length;
                })
                .entries(chart.filtered_data);
            var currentRange = d3.extent(chart.filtered_data, function(d) {
                return +d[chart.config.value_col];
            });
            //Sort normal ranges so larger normal ranges plot beneath smaller normal ranges.
            normalRanges.sort(function(a, b) {
                var a_lo = a.key.split(',')[0];
                var a_hi = a.key.split(',')[1];
                var b_lo = b.key.split(',')[0];
                var b_hi = b.key.split(',')[1];
                return a_lo <= b_lo && a_hi >= b_hi
                    ? 2 // lesser minimum and greater maximum
                    : a_lo >= b_lo && a_hi <= b_hi
                        ? -2 // greater minimum and lesser maximum
                        : a_lo <= b_lo && a_hi <= b_hi
                            ? 1 // lesser minimum and lesser maximum
                            : a_lo >= b_lo && a_hi >= b_hi
                                ? -1 // greater minimum and greater maximum
                                : 1;
            });
            //Add divs to chart for each normal range.
            canvas
                .selectAll('.normalRange rect')
                .data(normalRanges)
                .enter()
                .insert('rect', ':first-child')
                .attr({
                    class: 'normalRange',
                    x: function x(d) {
                        return chart.x(Math.max(+d.key.split(',')[0], currentRange[0]));
                    }, // set x to range low
                    y: 0,
                    width: function width(d) {
                        return Math.min(
                            chart.plot_width -
                                chart.x(Math.max(+d.key.split(',')[0], currentRange[0])), // chart width - range low

                            chart.x(+d.key.split(',')[1]) -
                                chart.x(Math.max(+d.key.split(',')[0], currentRange[0]))
                        );
                    }, // range high - range low

                    height: chart.plot_height
                })
                .style({
                    stroke: 'black',
                    fill: 'black',
                    'stroke-opacity': function strokeOpacity(d) {
                        return (d.values / chart.filtered_data.length) * 0.75;
                    }, // opacity as a function of fraction of records with the given normal range
                    'fill-opacity': function fillOpacity(d) {
                        return (d.values / chart.filtered_data.length) * 0.5;
                    }
                }) // opacity as a function of fraction of records with the given normal range
                .append('title')
                .text(function(d) {
                    return (
                        'Normal range: ' +
                        d.key.split(',')[0] +
                        '-' +
                        d.key.split(',')[1] +
                        (chart.config.unit_col
                            ? '' + chart.filtered_data[0][chart.config.unit_col]
                            : '') +
                        (' (' +
                            d3.format('%')(d.values / chart.filtered_data.length) +
                            ' of records)')
                    );
                });
        }
    }

    function addClearListing() {
        var chart = this;
        var footnote = this.wrap.select('.annote');
        this.wrap.selectAll('.overlay, .normalRange').on('click', function() {
            delete chart.highlightedBin;
            chart.listing.draw([]);
            chart.listing.wrap.selectAll('*').style('display', 'none');
            chart.svg.selectAll('.bar').attr('fill-opacity', 0.75);

            if (footnote.classed('tableTitle'))
                footnote.classed('tableTitle', false).text('Click a bar for details.');
        });
    }

    function maintainBinHighlighting() {
        var _this = this;

        if (this.highlightedBin)
            this.svg.selectAll('.bar').attr('fill-opacity', function(d) {
                return d.key !== _this.highlightedBin ? 0.5 : 1;
            });
    }

    function hideDuplicateXaxisTickLabels() {
        this.svg.selectAll('.x.axis .tick').each(function(d, i) {
            var tick = d3.select(this);
            var value = +d;
            var text = +tick.select('text').text();
            tick.style('display', value === text ? 'block' : 'none');
        });
    }

    function onResize() {
        //Draw custom bin for single observation subsets.
        handleSingleObservation.call(this);

        //Display data listing on bin click.
        addBinEventListeners.call(this);

        //Visualize normal ranges.
        drawNormalRanges.call(this);

        //Clear listing when clicking outside bins.
        addClearListing.call(this);

        //Keep highlighted bin highlighted on resize.
        maintainBinHighlighting.call(this);

        //Hide duplicate x-axis tick labels (d3 sometimes draws more ticks than the precision allows).
        hideDuplicateXaxisTickLabels.call(this);
    }

    function onDestroy() {}

    var callbacks = {
        onInit: onInit,
        onLayout: onLayout,
        onPreprocess: onPreprocess,
        onDatatransform: onDatatransform,
        onDraw: onDraw,
        onResize: onResize,
        onDestroy: onDestroy
    };

    function safetyHistogram(element, settings) {
        //Define chart.
        var mergedSettings = Object.assign({}, configuration.settings, settings);
        var syncedSettings = configuration.syncSettings(mergedSettings);
        var syncedControlInputs = configuration.syncControlInputs(
            configuration.controlInputs(),
            syncedSettings
        );
        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var chart = webcharts.createChart(element, syncedSettings, controls);

        //Define chart callbacks.
        for (var callback in callbacks) {
            chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);
        } //Define listing
        var listingSettings = Object.assign(
            {},
            {
                cols: syncedSettings.details.map(function(detail) {
                    return detail.value_col;
                }),
                headers: syncedSettings.details.map(function(detail) {
                    return detail.label;
                })
            },
            syncedSettings
        );
        var listing = webcharts.createTable(element, listingSettings);

        //Attach listing to chart.
        chart.listing = listing;
        listing.chart = chart;

        //Initialize listing and hide initially.
        chart.listing.init([]);
        chart.listing.wrap.selectAll('*').style('display', 'none');

        return chart;
    }

    return safetyHistogram;
});
