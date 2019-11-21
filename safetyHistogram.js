(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('d3'), require('webcharts')))
        : typeof define === 'function' && define.amd
        ? define(['d3', 'webcharts'], factory)
        : ((global = global || self),
          (global.safetyHistogram = factory(global.d3, global.webCharts)));
})(this, function(d3$1, webcharts) {
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

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, 'length')).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return undefined.

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

                var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

                var thisArg = arguments[1]; // 5. Let k be 0.

                var k = 0; // 6. Repeat, while k < len

                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];

                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    } // e. Increase k by 1.

                    k++;
                } // 7. Return -1.

                return -1;
            }
        });
    }

    Math.log10 = Math.log10 =
        Math.log10 ||
        function(x) {
            return Math.log(x) * Math.LOG10E;
        };

    d3$1.selection.prototype.moveToFront = function() {
        return this.each(function() {
            this.parentNode.appendChild(this);
        });
    };

    d3$1.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;

            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });
    };

    function _typeof(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj &&
                    typeof Symbol === 'function' &&
                    obj.constructor === Symbol &&
                    obj !== Symbol.prototype
                    ? 'symbol'
                    : typeof obj;
            };
        }

        return _typeof(obj);
    }

    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

            return arr2;
        }
    }

    function _iterableToArray(iter) {
        if (
            Symbol.iterator in Object(iter) ||
            Object.prototype.toString.call(iter) === '[object Arguments]'
        )
            return Array.from(iter);
    }

    function _nonIterableSpread() {
        throw new TypeError('Invalid attempt to spread non-iterable instance');
    }

    function clone(obj) {
        var copy; //boolean, number, string, null, undefined

        if ('object' != _typeof(obj) || null == obj) return obj; //date

        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        } //array

        if (obj instanceof Array) {
            copy = [];

            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }

            return copy;
        } //object

        if (obj instanceof Object) {
            copy = {};

            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }

            return copy;
        }

        throw new Error('Unable to copy [obj]! Its type is not supported.');
    }

    function layout(element) {
        var containers = {
            main: d3$1
                .select(element)
                .append('div')
                .classed('safety-histogram', true)
        };
        containers.controls = containers.main.append('div').classed('sh-controls', true);
        containers.chart = containers.main.append('div').classed('sh-chart', true);
        containers.multiples = containers.main.append('div').classed('sh-multiples', true);
        containers.listing = containers.main.append('div').classed('sh-listing', true);
        return containers;
    }

    function styles() {
        var styles = [
            '.safety-histogram {' + '    display: inline-block;' + '    width: 100%;' + '}',
            '.safety-histogram > * {' + '    display: inline-block;' + '    width: 100%;' + '}',
            '.sh-controls {' + '}',
            '.sh-chart,' + '.sh-listing {' + '    width: 75%;' + '    float: left;' + '}',
            '.sh-chart {' + '}',
            '.sh-multiples {' + '    width: 24%;' + '    float: right;' + '}',
            '.sh-multiples .wc-small-multiples .wc-chart {' +
                '    display: inline-block;' +
                '    width: 100%;' +
                '    position: relative;' +
                '}',
            '.sh-multiples .wc-small-multiples .wc-chart.wc-chart-title {' +
                '    position: absolute;' +
                '    top: 0;' +
                '    right: 0;' +
                '    width: 100%;' +
                '}',
            '.sh-statistical-test {' +
                '    position: absolute;' +
                '    top: 0;' +
                '    right: 0;' +
                '    font-weight: bold;' +
                '    cursor: help;' +
                '}',
            '#group-by {' +
                '    width: 100%;' +
                '    padding-bottom: 4px;' +
                '    border-bottom: 1px solid #aaa;' +
                '    margin-bottom: 4px;' +
                '    display: flex;' +
                '    justify-content: center;' +
                '}',
            '#group-by .wc-control-label {' + '    margin-right: 5px;' + '}',
            '#group-by .span-description {' + '    display: none;' + '}',
            '#group-by .changer {' + '}',
            '.sh-listing {' + '}'
        ]; // Attach styles to DOM.

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function rendererSettings() {
        return {
            // required variables
            measure_col: 'TEST',
            value_col: 'STRESN',
            // optional variables
            id_col: 'USUBJID',
            unit_col: 'STRESU',
            normal_col_low: 'STNRLO',
            normal_col_high: 'STNRHI',
            filters: null,
            groups: null,
            details: null,
            // miscellaneous settings
            start_value: null,
            normal_range: true,
            displayNormalRange: false,
            bin_algorithm: "Scott's normal reference rule",
            annotate_bin_boundaries: false
        };
    }

    function webchartsSettings() {
        return {
            x: {
                type: 'linear',
                column: null,
                // set in ./syncSettings
                label: null,
                // set in ../callbacks/onPreprocess/setXaxisLabel
                domain: [null, null],
                // set in ../callbacks/onPreprocess/setXdomain
                format: null,
                // set in ../callbacks/onPreprocess/calculateXPrecision
                bin: null // set in ../callbacks/onPreprocess/defineMeasureData
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
                    per: [],
                    // set in ./syncSettings
                    type: 'bar',
                    summarizeX: 'mean',
                    summarizeY: 'count',
                    attributes: {
                        'fill-opacity': 0.75
                    }
                }
            ],
            legend: {},
            aspect: 3
        };
    }

    function syncSettings(settings) {
        settings.x.column = settings.value_col;
        settings.x.bin_algorithm = settings.bin_algorithm;
        settings.marks[0].per[0] = settings.value_col; // update normal range settings if normal_range is set to false

        if (!settings.normal_range) {
            settings.normal_col_low = null;
            settings.normal_col_high = null;
            settings.displayNormalRange = false;
        } // handle a string argument to filters

        if (!(settings.filters instanceof Array))
            settings.filters = typeof settings.filters === 'string' ? [settings.filters] : []; // handle a string argument to groups

        if (!(settings.groups instanceof Array))
            settings.groups = typeof settings.groups === 'string' ? [settings.groups] : []; // stratification

        var defaultGroup = {
            value_col: 'sh_none',
            label: 'None'
        };
        if (!(settings.groups instanceof Array && settings.groups.length))
            settings.groups = [defaultGroup];
        else
            settings.groups = [defaultGroup].concat(
                settings.groups.map(function(group) {
                    return {
                        value_col: group.value_col || group,
                        label: group.label || group.value_col || group
                    };
                })
            ); // Remove duplicate values.

        settings.groups = d3$1
            .set(
                settings.groups.map(function(group) {
                    return group.value_col;
                })
            )
            .values()
            .map(function(value) {
                return {
                    value_col: value,
                    label: settings.groups.find(function(group) {
                        return group.value_col === value;
                    }).label
                };
            }); // Set initial group-by variable.

        settings.group_by = settings.group_by
            ? settings.group_by
            : settings.groups.length > 1
            ? settings.groups[1].value_col
            : defaultGroup.value_col;
        console.log(settings.group_by); // handle a string argument to details

        if (!(settings.details instanceof Array))
            settings.details = typeof settings.details === 'string' ? [settings.details] : []; // Define default details.

        var defaultDetails = [
            {
                value_col: settings.id_col,
                label: 'Participant ID'
            }
        ];
        if (Array.isArray(settings.filters))
            settings.filters
                .filter(function(filter) {
                    return filter.value_col !== settings.id_col;
                })
                .forEach(function(filter) {
                    return defaultDetails.push({
                        value_col: filter.value_col ? filter.value_col : filter,
                        label: filter.label
                            ? filter.label
                            : filter.value_col
                            ? filter.value_col
                            : filter
                    });
                });
        defaultDetails.push({
            value_col: settings.value_col,
            label: 'Result'
        });
        if (settings.normal_col_low)
            defaultDetails.push({
                value_col: settings.normal_col_low,
                label: 'Lower Limit of Normal'
            });
        if (settings.normal_col_high)
            defaultDetails.push({
                value_col: settings.normal_col_high,
                label: 'Upper Limit of Normal'
            }); // If [settings.details] is not specified:

        if (!settings.details) settings.details = defaultDetails;
        else {
            // If [settings.details] is specified:
            // Allow user to specify an array of columns or an array of objects with a column property
            // and optionally a column label.
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
                label: 'Measure',
                value_col: 'sh_measure',
                start: null // set in ../callbacks/onInit/checkControls/updateMeasureFilter
            },
            {
                type: 'dropdown',
                label: 'Group by',
                option: 'group_by',
                start: null,
                // set in ./syncControlInputs
                values: null,
                // set in ./syncControlInputs
                require: false
            },
            {
                type: 'number',
                label: 'Lower',
                option: 'x.domain[0]',
                require: true
            },
            {
                type: 'number',
                label: 'Upper',
                option: 'x.domain[1]',
                require: true
            },
            {
                type: 'dropdown',
                label: 'Algorithm',
                option: 'x.bin_algorithm',
                values: [
                    'Square-root choice',
                    "Sturges' formula",
                    'Rice Rule', // 'Doane\'s formula',
                    "Scott's normal reference rule",
                    "Freedman-Diaconis' choice",
                    "Shimazaki and Shinomoto's choice",
                    'Custom'
                ],
                require: true
            },
            {
                type: 'number',
                label: 'Quantity',
                option: 'x.bin'
            },
            {
                type: 'number',
                label: 'Width',
                option: 'x.bin_width'
            },
            {
                type: 'checkbox',
                label: 'Normal Range',
                option: 'displayNormalRange'
            },
            {
                type: 'radio',
                label: 'X-axis Ticks',
                option: 'annotate_bin_boundaries',
                values: [false, true],
                relabels: ['linear', 'bin boundaries']
            }
        ];
    }

    function syncControlInputs(controlInputs, settings) {
        // Add filters to default controls.
        if (Array.isArray(settings.filters) && settings.filters.length > 0) {
            var position = controlInputs.findIndex(function(input) {
                return input.label === 'Algorithm';
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
        } // Sync group control.

        var groupControl = controlInputs.find(function(controlInput) {
            return controlInput.label === 'Group by';
        });
        groupControl.start = settings.groups.find(function(group) {
            return group.value_col === settings.group_by;
        }).label;
        groupControl.values = settings.groups.map(function(group) {
            return group.label;
        }); // Remove normal range control.

        if (!settings.normal_range)
            controlInputs.splice(
                controlInputs.findIndex(function(input) {
                    return input.label === 'Normal Range';
                }),
                1
            );
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

    var properties = {
        measure_col: {
            title: 'Medical Sign',
            description: 'a variable that contains the names of each medical sign',
            type: 'string',
            default: 'TEST',
            'data-mapping': true,
            'data-type': 'character',
            required: true
        },
        value_col: {
            title: 'Result',
            description:
                'a variable that contains the results for each medical sign; non-numeric results are removed with a notification thrown to the log',
            type: 'string',
            default: 'STRESN',
            'data-mapping': true,
            'data-type': 'numeric',
            required: true
        },
        id_col: {
            title: 'ID',
            description: 'a variable that contains IDs for each participant',
            type: 'string',
            default: 'USUBJID',
            'data-mapping': true,
            'data-type': 'character',
            required: false
        },
        unit_col: {
            title: 'Unit',
            description: 'a variable that contains the units of each medical sign',
            type: 'string',
            default: 'STRESU',
            'data-mapping': true,
            'data-type': 'character',
            required: false
        },
        normal_col_low: {
            title: 'Lower Limit of Normal',
            description: 'a variable that contains the lower limit of normal of the medical sign',
            type: 'string',
            default: 'STNRLO',
            'data-mapping': true,
            'data-type': 'numeric',
            required: false
        },
        normal_col_high: {
            title: 'Upper Limit of Normal',
            description: 'a variable that contains the upper limit of normal of the medical sign',
            type: 'string',
            default: 'STNRHI',
            'data-mapping': true,
            'data-type': 'numeric',
            required: false
        },
        filters: {
            title: 'Filter Variables',
            description:
                'an array of variables and metadata that will appear in the controls as data filters',
            type: 'array',
            items: {
                properties: {
                    label: {
                        description: 'a description of the variable',
                        title: 'Variable Label',
                        type: 'string'
                    },
                    value_col: {
                        description: 'the name of the variable',
                        title: 'Variable Name',
                        type: 'string'
                    }
                },
                type: 'object'
            },
            'data-mapping': true,
            'data-type': 'either',
            required: false
        },
        details: {
            title: 'Listing Variables',
            description: 'an array of variables and metadata that will appear in the data listing',
            type: 'array',
            items: {
                properties: {
                    label: {
                        description: 'a description of the variable',
                        title: 'Variable Label',
                        type: 'string'
                    },
                    value_col: {
                        description: 'the name of the variable',
                        title: 'Variable Name',
                        type: 'string'
                    }
                },
                type: 'object'
            },
            'data-mapping': true,
            'data-type': 'either',
            required: false
        },
        start_value: {
            title: 'Initial Medical Sign',
            description:
                'the name of the initially displayed medical sign; defaults to the first measure in the data',
            type: 'string'
        },
        normal_range: {
            title: 'Generate Normal Range Control?',
            description:
                'a boolean that dictates whether the normal range control will be generated',
            type: 'boolean',
            default: true
        },
        displayNormalRange: {
            title: 'Display Normal Range?',
            description:
                'a boolean that dictates whether the normal range will be displayed initially',
            type: 'boolean',
            default: false
        },
        bin_algorithm: {
            title: 'Initial Binning Algorithm',
            description:
                'a boolean that dictates whether the normal range will be displayed initially',
            type: 'string',
            default: "Scott's normal reference rule",
            enum: [
                'Square-root choice',
                "Sturges' formula",
                'Rice Rule',
                "Scott's normal reference rule",
                "Freedman-Diaconis' choice",
                "Shimazaki and Shinomoto's choice"
            ]
        },
        annotate_bin_boundaries: {
            title: 'Annotate Bin Boundaries?',
            description:
                'a boolean that dictates whether x-axis tick labels appear between bars or at regular intervals along the x-axis',
            type: 'boolean',
            default: false
        }
    };

    function checkRequired() {
        var _this = this;

        this.variables.required = this.variables.definitions.filter(function(definition) {
            return definition.required === true;
        });
        this.variables.required.forEach(function(definition) {
            if (_this.variables.actual.indexOf(definition.setting) < 0) {
                definition.missing = true; // Define error text.

                var codeStyle = [
                    'padding: 1px 5px',
                    'white-space: prewrap',
                    'font-family: Consolas,Lucida Console,Courier New,monospace,sans-serif',
                    'background-color: #eff0f1'
                ];
                var errorText = "The variable specified for <code style='"
                    .concat(codeStyle.join(';'), "'>")
                    .concat(definition.property, '</code>, <em>')
                    .concat(definition.setting, '</em>, does not exist in the data.'); // Print error to console.

                console.error(errorText.replace(/<.+?>/g, '')); // Print error to containing element.

                var div = d3$1.select(_this.div);
                div.append('p')
                    .html(errorText)
                    .style('color', 'red');
            }
        }); // Destroy chart.

        if (
            this.variables.required.some(function(definition) {
                return definition.missing;
            })
        )
            this.destroy();
    }

    function checkOptional() {
        var _this = this;

        this.variables.optional = this.variables.definitions.filter(function(definition) {
            return definition.required === false;
        });
        this.variables.optional.forEach(function(definition) {
            if (definition.type === 'string') {
                if (_this.variables.actual.indexOf(definition.setting) < 0) {
                    definition.missing = true;
                    console.warn(
                        'The variable specified for [ '
                            .concat(definition.property, ' ], ')
                            .concat(definition.setting, ', does not exist in the data.')
                    );
                }
            } // standard data mappings
            else if (
                definition.type === 'array' &&
                Array.isArray(definition.setting) &&
                definition.setting.length
            ) {
                definition.setting.forEach(function(subDefinition, i) {
                    var variable = subDefinition.value_col || subDefinition;

                    if (_this.variables.actual.indexOf(variable) < 0) {
                        definition.missing = true;
                        console.warn(
                            'The variable specified for [ '
                                .concat(definition.property, '[')
                                .concat(i, '] ], ')
                                .concat(variable, ', does not exist in the data.')
                        );
                    }
                });
            } // optional variable arrays (filters, listing columns)
            // Remove participant ID column from listing if variable is missing.

            if (definition.property === 'id_col' && definition.missing) {
                var index = _this.listing.config.cols.findIndex(function(col) {
                    return col === definition.setting;
                });

                _this.listing.config.cols.splice(index, 1);

                _this.listing.config.headers.splice(index, 1);
            }
        });
    }

    function checkVariables() {
        var _this = this;

        this.variables = {
            actual: Object.keys(this.raw_data[0]),
            definitions: Object.keys(properties)
                .map(function(property) {
                    var definition = properties[property];
                    definition.property = property;
                    definition.setting = _this.config[property];
                    return definition;
                })
                .filter(function(definition) {
                    return definition['data-mapping'];
                })
        };
        checkRequired.call(this);
        checkOptional.call(this);
    }

    function countParticipants() {
        var _this = this;

        this.participantCount = {
            N: d3$1
                .set(
                    this.raw_data.map(function(d) {
                        return d[_this.config.id_col];
                    })
                )
                .values()
                .filter(function(value) {
                    return !/^\s*$/.test(value);
                }).length,
            container: null,
            // set in ../onLayout/addParticipantCountContainer
            n: null,
            // set in ../onDraw/updateParticipantCount
            percentage: null // set in ../onDraw/updateParticipantCount
        };
    }

    function removeMissingResults() {
        var _this = this;

        // Split data into records with missing and nonmissing results.
        var missingResults = [];
        var nonMissingResults = [];
        this.raw_data.forEach(function(d) {
            if (/^\s*$/.test(d[_this.config.value_col])) missingResults.push(d);
            else nonMissingResults.push(d);
        }); // Nest missing and nonmissing results by participant.

        var participantsWithMissingResults = d3$1
            .nest()
            .key(function(d) {
                return d[_this.config.id_col];
            })
            .rollup(function(d) {
                return d.length;
            })
            .entries(missingResults);
        var participantsWithNonMissingResults = d3$1
            .nest()
            .key(function(d) {
                return d[_this.config.id_col];
            })
            .rollup(function(d) {
                return d.length;
            })
            .entries(nonMissingResults); // Identify placeholder records, i.e. participants with a single missing result.

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
                ''.concat(
                    this.removedRecords.placeholderRecords.length,
                    ' participants without results have been detected.'
                )
            ); // Count the number of records with missing results.

        this.removedRecords.missing = d3$1.sum(
            participantsWithMissingResults.filter(function(d) {
                return _this.removedRecords.placeholderRecords.indexOf(d.key) < 0;
            }),
            function(d) {
                return d.values;
            }
        );
        if (this.removedRecords.missing > 0)
            console.warn(
                ''
                    .concat(this.removedRecords.missing, ' record')
                    .concat(
                        this.removedRecords.missing > 1
                            ? 's with a missing result have'
                            : ' with a missing result has',
                        ' been removed.'
                    )
            ); // Update data.

        this.raw_data = nonMissingResults;
    }

    function removeNonNumericResults() {
        var _this = this;

        // Filter out non-numeric results.
        var numericResults = this.raw_data.filter(function(d) {
            return /^-?[0-9.]+$/.test(d[_this.config.value_col]);
        });
        this.removedRecords.nonNumeric = this.raw_data.length - numericResults.length;
        if (this.removedRecords.nonNumeric > 0)
            console.warn(
                ''
                    .concat(this.removedRecords.nonNumeric, ' record')
                    .concat(
                        this.removedRecords.nonNumeric > 1
                            ? 's with a non-numeric result have'
                            : ' with a non-numeric result has',
                        ' been removed.'
                    )
            ); // Update data.

        this.raw_data = numericResults;
    }

    function cleanData() {
        this.removedRecords = {
            placeholderParticipants: null,
            // defined in './cleanData/removeMissingResults
            missing: null,
            // defined in './cleanData/removeMissingResults
            nonNumeric: null,
            // defined in './cleanData/removeNonNumericResults
            container: null // defined in ../onLayout/addRemovedRecordsContainer
        };
        removeMissingResults.call(this);
        removeNonNumericResults.call(this);
        this.initial_data = this.raw_data;
    }

    function addVariables() {
        var _this = this;

        this.raw_data.forEach(function(d) {
            // Concatenate unit to measure if provided.
            d[_this.config.measure_col] = d[_this.config.measure_col].trim();
            d.sh_measure = d.hasOwnProperty(_this.config.unit_col)
                ? ''.concat(d[_this.config.measure_col], ' (').concat(d[_this.config.unit_col], ')')
                : d[_this.config.measure_col]; // Coerce y-variable to numeric.

            d[_this.config.y.column] = parseFloat(d[_this.config.y.column]); // Add placeholder variable for non-grouped comparisons.

            d.sh_none = 'All Participants';
        });
    }

    function participant() {
        var _this = this;

        this.participants = d3$1
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

        this.measures = d3$1
            .set(
                this.initial_data.map(function(d) {
                    return d[_this.config.measure_col];
                })
            )
            .values()
            .sort();
        this.sh_measures = d3$1
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
                ''
                    .concat(this.config.start_value, ' is an invalid measure. Defaulting to ')
                    .concat(measureInput.start, '.')
            );
        } else if (
            this.config.start_value &&
            this.sh_measures.indexOf(this.config.start_value) < 0
        ) {
            measureInput.start = this.sh_measures[this.measures.indexOf(this.config.start_value)];
            console.warn(
                ''
                    .concat(this.config.start_value, ' is missing the units value. Defaulting to ')
                    .concat(measureInput.start, '.')
            );
        } else measureInput.start = this.config.start_value || this.sh_measures[0];
    }

    function removeFilters() {
        var _this = this;

        this.controls.config.inputs = this.controls.config.inputs.filter(function(input) {
            if (input.type !== 'subsetter' || input.value_col === 'sh_measure') {
                return true;
            } else if (!_this.raw_data[0].hasOwnProperty(input.value_col)) {
                console.warn(
                    'The [ '.concat(
                        input.label,
                        ' ] filter has been removed because the variable does not exist.'
                    )
                );
            } else {
                var levels = d3$1
                    .set(
                        _this.raw_data.map(function(d) {
                            return d[input.value_col];
                        })
                    )
                    .values();
                if (levels.length === 1)
                    console.warn(
                        'The [ '.concat(
                            input.label,
                            ' ] filter has been removed because the variable has only one level.'
                        )
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
        // 0. Check variables.
        checkVariables.call(this); // 1. Count total participants prior to data cleaning.

        countParticipants.call(this); // 2. Drop missing values and remove measures with any non-numeric results.

        cleanData.call(this); // 3. Define additional variables.

        addVariables.call(this); // 4. Define sets.

        defineSets.call(this); // 5. Check controls.

        checkControls.call(this);
    }

    function identifyControls() {
        var context = this;
        var controlGroups = this.controls.wrap
            .style('padding-bottom', '8px')
            .selectAll('.control-group'); // Give each control a unique ID.

        controlGroups
            .attr('id', function(d) {
                return d.label.toLowerCase().replace(/ /g, '-');
            })
            .each(function(d) {
                var controlGroup = d3$1.select(this);
                controlGroup.classed(d.type, true);
                context.controls[d.label] = controlGroup;
            }); // Give x-axis controls a common class name.

        controlGroups
            .filter(function(d) {
                return ['x.domain[0]', 'x.domain[1]'].indexOf(d.option) > -1;
            })
            .classed('x-axis', true); // Give binning controls a common class name.

        controlGroups
            .filter(function(d) {
                return ['x.bin_algorithm', 'x.bin', 'x.bin_width'].indexOf(d.option) > -1;
            })
            .classed('bin', true);
    }

    function customizeGroupByControl() {
        var _this2 = this;

        var context = this;
        var groupControl = this.controls.wrap.selectAll('.control-group#group-by');
        this.containers.multiples.node().appendChild(groupControl.node()); // Hide group-by control when no groups are specified.

        if (groupControl.datum().values.length === 1) groupControl.style('display', 'none');
        else {
            var _select = groupControl.selectAll('select').on('change', function(d) {
                var _this = this;

                console.log(this.value);
                context.config.group_by = context.config.groups.find(function(group) {
                    return group.label === _this.value;
                }).value_col;
                console.log(context.config.group_by);
                context.draw();
            });

            var options = _select
                .selectAll('option')
                .property('selected', function(d) {
                    return (
                        _this2.config.groups.find(function(group) {
                            return group.label === d;
                        }).value_col === _this2.config.group_by
                    );
                })
                .style('display', function(d, i) {
                    return i > 0 && this.value === 'None' ? 'none' : null;
                });
        }
    }

    function addXdomainResetButton() {
        var _this = this;

        // Add x-domain reset button container.
        this.controls.reset = {
            container: this.controls.wrap
                .insert('div', '#lower')
                .classed('control-group x-axis', true)
                .datum({
                    type: 'button',
                    option: 'x.domain',
                    label: ''
                })
                .style('vertical-align', 'bottom')
        }; // Add label.

        this.controls.reset.label = this.controls.reset.container
            .append('span')
            .attr('class', 'wc-control-label')
            .text(''); // Add button.

        this.controls.reset.button = this.controls.reset.container
            .append('button')
            .text(' Reset ')
            .style('padding', '0px 5px')
            .on('click', function() {
                _this.config.x.domain = _this.measure.raw.domain;

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
        var className = label.toLowerCase().replace(/ /g, '-') + '-grouping';
        var div = this.controls.wrap
            .insert('div', selector)
            .classed(''.concat(className, '-div'), true)
            .style({
                display: 'inline-block',
                'margin-right': '5px'
            });
        var fieldset = div
            .append('fieldset')
            .classed(''.concat(className, '-fieldset'), true)
            .style('padding', '0px 2px');
        var legend = fieldset
            .append('legend')
            .classed(''.concat(className, '-legend'), true)
            .text(label);
        this.controls.wrap.selectAll(selector).each(function(d) {
            this.style.marginTop = '0px';
            this.style.marginRight = '2px';
            this.style.marginBottom = '2px';
            this.style.marginLeft = '2px';
            fieldset.node().appendChild(this);
        });
    }

    function groupControls() {
        // Group x-axis controls.
        insertGrouping.call(this, '.x-axis', 'X-axis Limits'); // Group filters.

        if (this.filters.length > 1)
            insertGrouping.call(this, '.subsetter:not(#measure)', 'Filters'); // Group bin controls.

        insertGrouping.call(this, '.bin', 'Bins');
    }

    function addXdomainZoomButton() {
        var _this = this;

        if (
            this.filters.find(function(filter) {
                return filter.col !== 'sh_measure';
            })
        ) {
            // Add x-domain zoom button container.
            var resetContainer = this.controls.wrap
                .select('.x-axis-limits-grouping-fieldset')
                .append('div')
                .classed('control-group x-axis', true)
                .datum({
                    type: 'button',
                    option: 'x.domain',
                    label: ''
                })
                .attr('title', 'Zoom in on filtered histogram.')
                .style({
                    'vertical-align': 'bottom',
                    'margin-top': '0px',
                    'margin-right': '2px',
                    'margin-bottom': '2px',
                    'margin-left': '2px'
                }); // Add label.

            resetContainer
                .append('span')
                .attr('class', 'wc-control-label')
                .text(''); // Add button.

            resetContainer
                .append('button')
                .text(' Zoom ')
                .style('padding', '0px 5px')
                .on('click', function() {
                    _this.config.x.domain = _this.measure.filtered.domain;

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
    }

    function customizeBinsEventListener() {
        var _this = this;

        var context = this;
        this.controls.Algorithm.selectAll('.wc-control-label')
            .append('span')
            .classed('algorithm-explanation', true)
            .html(' &#9432')
            .style('cursor', 'pointer')
            .on('click', function() {
                if (_this.config.x.bin_algorithm !== 'Custom')
                    window.open(
                        'https:// en.wikipedia.org/wiki/Histogram#'.concat(
                            _this.config.x.bin_algorithm
                                .replace(/ /g, '_')
                                .replace('Freedman-Diaconis', 'Freedman%E2%80%93Diaconis')
                        )
                    );
            });
        this.controls.Quantity.selectAll('input')
            .attr({
                min: 1,
                step: 1
            })
            .on('change', function(d) {
                if (this.value < 1) this.value = 1;
                if (this.value % 1) this.value = Math.round(this.value);
                context.config.x.bin = this.value;
                context.config.x.bin_algorithm = 'Custom';
                context.controls.Algorithm.selectAll('option').property('selected', function(di) {
                    return di === 'Custom';
                });
                context.draw();
            });
        this.controls.Width.selectAll('input').property('disabled', true);
    }

    function addParticipantCountContainer() {
        this.participantCount.container = this.controls.wrap
            .style('position', 'relative')
            .append('div')
            .attr('id', 'participant-count')
            .style({
                position: 'absolute',
                'font-style': 'italic',
                bottom: '0px',
                left: 0,
                display: this.variables.optional.find(function(definition) {
                    return definition.property === 'id_col';
                }).missing
                    ? 'none'
                    : 'block'
            });
    }

    function addRemovedRecordsNote() {
        var _this = this;

        if (this.removedRecords.missing > 0 || this.removedRecords.nonNumeric > 0) {
            var message =
                this.removedRecords.missing > 0 && this.removedRecords.nonNumeric > 0
                    ? ''
                          .concat(this.removedRecords.missing, ' record')
                          .concat(
                              this.removedRecords.missing > 1 ? 's' : '',
                              ' with a missing result and '
                          )
                          .concat(this.removedRecords.nonNumeric, ' record')
                          .concat(
                              this.removedRecords.nonNumeric > 1 ? 's' : '',
                              ' with a non-numeric result were removed.'
                          )
                    : this.removedRecords.missing > 0
                    ? ''
                          .concat(this.removedRecords.missing, ' record')
                          .concat(
                              this.removedRecords.missing > 1 ? 's' : '',
                              ' with a missing result '
                          )
                          .concat(this.removedRecords.missing > 1 ? 'were' : 'was', ' removed.')
                    : this.removedRecords.nonNumeric > 0
                    ? ''
                          .concat(this.removedRecords.nonNumeric, ' record')
                          .concat(
                              this.removedRecords.nonNumeric > 1 ? 's' : '',
                              ' with a non-numeric result '
                          )
                          .concat(this.removedRecords.nonNumeric > 1 ? 'were' : 'was', ' removed.')
                    : '';
            this.removedRecords.container = this.controls.wrap
                .append('div')
                .style({
                    position: 'absolute',
                    'font-style': 'italic',
                    bottom: '0px',
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
        this.controls.wrap.style({
            'border-bottom': '1px solid #ccc'
        });
    }

    function addFootnoteContainer() {
        this.footnotes = {
            container: this.wrap
                .insert('div', '.wc-chart')
                .classed('footnotes', true)
                .style({
                    'border-top': '1px solid #ccc',
                    'padding-top': '10px'
                })
        };
        this.footnotes.barClick = this.footnotes.container
            .append('p')
            .classed('footnote footnote--bar-click', true)
            .text('Click a bar for details.');
        this.footnotes.barDetails = this.footnotes.container
            .append('p')
            .classed('footnote footnote--bar-details', true)
            .html('<br>');
    }

    function onLayout() {
        identifyControls.call(this);
        customizeGroupByControl.call(this);
        addXdomainResetButton.call(this);
        groupControls.call(this);
        addXdomainZoomButton.call(this);
        customizeBinsEventListener.call(this);
        addParticipantCountContainer.call(this);
        addRemovedRecordsNote.call(this);
        addBorderAboveChart.call(this);
        addFootnoteContainer.call(this);
    }

    function getCurrentMeasure() {
        this.measure.previous = this.measure.current;
        this.measure.current = this.controls.wrap.selectAll('#measure option:checked').text();
        this.config.x.label = this.measure.current;
        if (this.measure.current !== this.measure.previous) this.config.x.custom_bin = false;
    }

    function defineMeasureData() {
        var _this = this;

        // Filter data on selected measure.
        this.measure.raw = {
            data: this.initial_data.filter(function(d) {
                return d.sh_measure === _this.measure.current;
            })
        }; // Apply other filters to measure data.

        this.measure.filtered = {
            data: this.measure.raw.data
        };
        this.filters.forEach(function(filter) {
            _this.measure.filtered.data = _this.measure.filtered.data.filter(function(d) {
                return filter.val === 'All'
                    ? true
                    : Array.isArray(filter.val)
                    ? filter.val.includes(d[filter.col])
                    : filter.val === d[filter.col];
            });
        }); // Filter results on current x-domain.

        if (this.measure.current !== this.measure.previous)
            this.config.x.domain = d3$1.extent(
                this.measure.raw.data.map(function(d) {
                    return +d[_this.config.value_col];
                })
            );
        this.measure.custom = {
            data: this.measure.raw.data.filter(function(d) {
                return (
                    _this.config.x.domain[0] <= +d[_this.config.value_col] &&
                    +d[_this.config.value_col] <= _this.config.x.domain[1]
                );
            })
        }; // Define arrays of results, unique results, and extent of results.

        ['raw', 'custom', 'filtered'].forEach(function(property) {
            var obj = _this.measure[property]; // Define array of all and unique results.

            obj.results = obj.data
                .map(function(d) {
                    return +d[_this.config.value_col];
                })
                .sort(function(a, b) {
                    return a - b;
                });
            obj.uniqueResults = d3$1.set(obj.results).values(); // Calculate extent of data.

            obj.domain = property !== 'custom' ? d3$1.extent(obj.results) : _this.config.x.domain;
        });
    }

    function setXdomain() {
        if (this.measure.current !== this.measure.previous)
            this.config.x.domain = this.measure.raw.domain;
        else if (this.config.x.domain[0] > this.config.x.domain[1]) this.config.x.domain.reverse(); // The x-domain can be in three states:
        // - the extent of all results
        // - user-defined, e.g. narrower to exclude outliers
        //
        // Bin width is calculated with two variables:
        // - the interquartile range
        // - the number of results
        //
        // 1 When the x-domain is set to the extent of all results, the bin width should be calculated
        //  with the unfiltered set of results, regardless of the state of the current filters.
        //
        // 2 Given a user-defined x-domain, the bin width should be calculated with the results that
        //  fall inside the current domain.

        this.measure.domain_state =
            (this.config.x.domain[0] === this.measure.raw.domain[0] &&
                this.config.x.domain[1] === this.measure.raw.domain[1]) ||
            this.measure.previous === undefined
                ? 'raw'
                : 'custom'; // Set chart data to measure data.

        this.raw_data = this.measure[this.measure.domain_state].data.slice();
    }

    function calculateStatistics(obj) {
        var _this = this;

        ['raw', 'custom'].forEach(function(property) {
            var obj = _this.measure[property]; // Calculate statistics.

            obj.stats = {
                n: obj.results.length,
                nUnique: obj.uniqueResults.length,
                min: obj.domain[0],
                q25: d3$1.quantile(obj.results, 0.25),
                median: d3$1.quantile(obj.results, 0.5),
                q75: d3$1.quantile(obj.results, 0.75),
                max: obj.domain[1],
                range: obj.domain[1] - obj.domain[0],
                std: d3$1.deviation(obj.results)
            };
            obj.stats.log10range = obj.stats.range > 0 ? Math.log10(obj.stats.range) : NaN;
            obj.stats.iqr = obj.stats.q75 - obj.stats.q25;
        });
    }

    function calculateSquareRootBinWidth(obj) {
        // https:// en.wikipedia.org/wiki/Histogram#Square-root_choice
        var range = this.config.x.domain[1] - this.config.x.domain[0];
        obj.stats.SquareRootBins = Math.ceil(Math.sqrt(obj.stats.n));
        obj.stats.SquareRootBinWidth = range / obj.stats.SquareRootBins;
    }

    function calculateSturgesBinWidth(obj) {
        // https:// en.wikipedia.org/wiki/Histogram#Sturges'_formula
        var range = this.config.x.domain[1] - this.config.x.domain[0];
        obj.stats.SturgesBins = Math.ceil(Math.log2(obj.stats.n)) + 1;
        obj.stats.SturgesBinWidth = range / obj.stats.SturgesBins;
    }

    function calculateRiceBinWidth(obj) {
        // https:// en.wikipedia.org/wiki/Histogram#Rice_Rule
        var range = this.config.x.domain[1] - this.config.x.domain[0];
        obj.stats.RiceBins = Math.ceil(2 * Math.pow(obj.stats.n, 1.0 / 3.0));
        obj.stats.RiceBinWidth = range / obj.stats.RiceBins;
    }

    function calculateScottBinWidth(obj) {
        // https:// en.wikipedia.org/wiki/Histogram#Scott's_normal_reference_rule
        var range = this.config.x.domain[1] - this.config.x.domain[0];
        obj.stats.ScottBinWidth = (3.5 * obj.stats.std) / Math.pow(obj.stats.n, 1.0 / 3.0);
        obj.stats.ScottBins =
            obj.stats.ScottBinWidth > 0
                ? Math.max(Math.ceil(range / obj.stats.ScottBinWidth), 5)
                : NaN;
    }

    function calculateFDBinWidth(obj) {
        // https:// en.wikipedia.org/wiki/Histogram#Freedman%E2%80%93Diaconis'_choice
        var range = this.config.x.domain[1] - this.config.x.domain[0];
        obj.stats.FDBinWidth = (2 * obj.stats.iqr) / Math.pow(obj.stats.n, 1.0 / 3.0);
        obj.stats.FDBins =
            obj.stats.FDBinWidth > 0 ? Math.max(Math.ceil(range / obj.stats.FDBinWidth), 5) : NaN;
    }

    function calculateSSBinWidth(obj) {
        // https:// en.wikipedia.org/wiki/Histogram#Shimazaki_and_Shinomoto's_choice
        var nBins = d3$1.range(2, 100); // number of bins

        var cost = d3$1.range(nBins.length); // cost function results

        var binWidths = _toConsumableArray(cost); // bin widths

        var binBoundaries = _toConsumableArray(cost); // bin boundaries

        var bins = _toConsumableArray(cost); // bins

        var binSizes = _toConsumableArray(cost); // bin lengths

        var meanBinSizes = _toConsumableArray(cost); // mean of bin lengths

        var residuals = _toConsumableArray(cost); // residuals

        var _loop = function _loop(i) {
            binWidths[i] = obj.stats.range / nBins[i];
            binBoundaries[i] = d3$1.range(obj.stats.min, obj.stats.max, obj.stats.range / nBins[i]);
            bins[i] = d3$1.layout.histogram().bins(nBins[i] - 1)(
                /*.bins(binBoundaries[i])*/
                obj.results
            );
            binSizes[i] = bins[i].map(function(arr) {
                return arr.length;
            });
            meanBinSizes[i] = d3$1.mean(binSizes[i]);
            residuals[i] =
                d3$1.sum(
                    binSizes[i].map(function(binSize) {
                        return Math.pow(binSize - meanBinSizes[i], 2);
                    })
                ) / nBins[i];
            cost[i] = (2 * meanBinSizes[i] - residuals[i]) / Math.pow(binWidths[i], 2);
        };

        for (var i = 0; i < nBins.length; i++) {
            _loop(i);
        }
        //    {
        //        nBins,
        //        binWidths,
        //        binBoundaries,
        //        // bins,
        //        binSizes,
        //        meanBinSizes,
        //        residuals,
        //        cost
        //    },
        //    5
        // );

        var minCost = d3$1.min(cost);
        var idx = cost.findIndex(function(c) {
            return c === minCost;
        });
        obj.stats.SSBinWidth = binWidths[idx];
        obj.stats.SSBins = nBins[idx]; // const optBinBoundaries = range(obj.stats.min, obj.stats.max, obj.stats.range/optNBins);
    }

    function calcualteBinWidth() {
        var _this = this;

        ['raw', 'custom'].forEach(function(property) {
            var obj = _this.measure[property]; // Calculate bin width with the selected algorithm.

            switch (_this.config.x.bin_algorithm) {
                case 'Square-root choice':
                    calculateSquareRootBinWidth.call(_this, obj);
                    obj.stats.nBins =
                        obj.stats.SquareRootBins < obj.stats.nUnique
                            ? obj.stats.SquareRootBins
                            : obj.stats.nUnique;
                    break;

                case "Sturges' formula":
                    calculateSturgesBinWidth.call(_this, obj);
                    obj.stats.nBins =
                        obj.stats.SturgesBins < obj.stats.nUnique
                            ? obj.stats.SturgesBins
                            : obj.stats.nUnique;
                    break;

                case 'Rice Rule':
                    calculateRiceBinWidth.call(_this, obj);
                    obj.stats.nBins =
                        obj.stats.RiceBins < obj.stats.nUnique
                            ? obj.stats.RiceBins
                            : obj.stats.nUnique;
                    break;
                // case 'Doane\'s formula':
                //    console.log(4);
                //    calculateDoaneBinWidth.call(this, obj);
                //    obj.stats.nBins =
                //        obj.stats.DoaneBins < obj.stats.nUnique ? obj.stats.DoaneBins : obj.stats.nUnique;
                //    break;

                case "Scott's normal reference rule":
                    calculateScottBinWidth.call(_this, obj);
                    obj.stats.nBins =
                        obj.stats.ScottBins < obj.stats.nUnique
                            ? obj.stats.ScottBins
                            : obj.stats.nUnique;
                    break;

                case "Freedman-Diaconis' choice":
                    calculateFDBinWidth.call(_this, obj);
                    obj.stats.nBins =
                        obj.stats.FDBins < obj.stats.nUnique ? obj.stats.FDBins : obj.stats.nUnique;
                    break;

                case "Shimazaki and Shinomoto's choice":
                    calculateSSBinWidth.call(_this, obj);
                    obj.stats.nBins =
                        obj.stats.SSBins < obj.stats.nUnique ? obj.stats.SSBins : obj.stats.nUnique;
                    break;

                default:
                    // Handle custom number of bins.
                    obj.stats.nBins = _this.config.x.bin;
                // obj.stats.binWidth = this.config.x.domain[1] - this.config.x.domain[0] / this.config.x.bin;
            } // Calculate bin width.

            obj.stats.binWidth = obj.stats.range / obj.stats.nBins;
            obj.stats.binBoundaries = d3$1.range(obj.stats.nBins).concat(obj.domain[1]);
        }); // Update chart config and set chart data to measure data.

        this.config.x.bin = this.measure[this.measure.domain_state].stats.nBins;
        this.config.x.bin_width = this.measure[this.measure.domain_state].stats.binWidth;
    }

    function calculateXPrecision() {
        // define the precision of the x-axis
        this.config.x.precisionFactor = Math.round(
            this.measure[this.measure.domain_state].stats.log10range
        );
        this.config.x.precision = Math.pow(10, this.config.x.precisionFactor); // x-axis format

        this.config.x.format =
            this.config.x.precisionFactor > 0
                ? '.0f'
                : '.'.concat(Math.abs(this.config.x.precisionFactor) + 1, 'f');
        this.config.x.d3format = d3$1.format(this.config.x.format); // one more precision please: bin format

        this.config.x.format1 =
            this.config.x.precisionFactor > 0
                ? '.1f'
                : '.'.concat(Math.abs(this.config.x.precisionFactor) + 2, 'f');
        this.config.x.d3format1 = d3$1.format(this.config.x.format1); // define the size of the x-axis limit increments

        var step =
            this.measure[this.measure.domain_state].stats.range > 0
                ? Math.abs(this.measure[this.measure.domain_state].stats.range / 15) // non-zero range
                : this.measure[this.measure.domain_state].results[0] !== 0
                ? Math.abs(this.measure[this.measure.domain_state].results[0] / 15) // zero range, non-zero result(s)
                : 1; // zero range, zero result(s)

        if (step < 1) {
            var x10 = 0;

            do {
                step = step * 10;
                ++x10;
            } while (step < 1);

            step = Math.round(step) / Math.pow(10, x10);
        } else step = Math.round(step);

        this.measure.step = step || 1;
    }

    function updateXAxisResetButton() {
        // Update tooltip of x-axis domain reset button.
        if (this.measure.current !== this.measure.previous) {
            this.controls.reset.container.attr(
                'title',
                'Initial Limits: [' +
                    this.config.x.d3format1(this.config.x.domain[0]) +
                    ' - ' +
                    this.config.x.d3format1(this.config.x.domain[1]) +
                    ']'
            );
        }
    }

    function updateXAxisLimits() {
        this.controls.wrap
            .selectAll('#lower input')
            .attr('step', this.measure.step) // set in ./calculateXPrecision
            .style('box-shadow', 'none')
            .property('value', this.config.x.d3format1(this.config.x.domain[0]));
        this.controls.wrap
            .selectAll('#upper input')
            .attr('step', this.measure.step) // set in ./calculateXPrecision
            .style('box-shadow', 'none')
            .property('value', this.config.x.d3format1(this.config.x.domain[1]));
    }

    function updateBinAlogrithm() {
        this.controls.Algorithm.selectAll('.algorithm-explanation')
            .style('display', this.config.x.bin_algorithm !== 'Custom' ? null : 'none')
            .attr(
                'title',
                this.config.x.bin_algorithm !== 'Custom'
                    ? 'View information on '.concat(this.config.x.bin_algorithm)
                    : null
            );
    }

    function updateBinWidth() {
        this.controls.Width.selectAll('input').property(
            'value',
            this.config.x.d3format1(this.config.x.bin_width)
        );
    }

    function updateBinQuantity() {
        this.controls.Quantity.selectAll('input').property('value', this.config.x.bin);
    }

    function updateControls() {
        updateXAxisResetButton.call(this);
        updateXAxisLimits.call(this);
        updateBinAlogrithm.call(this);
        updateBinWidth.call(this);
        updateBinQuantity.call(this);
    }

    function defineBinBoundaries() {
        var _this = this;

        var obj = this.measure[this.measure.domain_state];
        this.measure.binBoundaries = obj.stats.binBoundaries.map(function(d, i) {
            var value = obj.domain[0] + obj.stats.binWidth * i;
            return {
                value: value,
                value1: _this.config.x.d3format(value),
                value2: _this.config.x.d3format1(value)
            };
        });
    }

    function onPreprocess() {
        // 1. Capture currently selected measure - needed in 2a.
        getCurrentMeasure.call(this); // 2. Filter data on currently selected measure - needed in 3a and 3b.

        defineMeasureData.call(this); // 3a Set x-domain given currently selected measure - needed in 4a and 4b.

        setXdomain.call(this); // 3b Calculate statistics - needed in 4a and 4b.

        calculateStatistics.call(this); // 4a Define precision of measure - needed in step 5a and 5b.

        calculateXPrecision.call(this); // 4b Calculate bin width - needed in step 5c.

        calcualteBinWidth.call(this); // 5a Update x-axis and bin controls after.

        updateControls.call(this); // 5b Define bin boundaries given bin width and precision.

        defineBinBoundaries.call(this);
    }

    function onDatatransform() {}

    function updateParticipantCount() {
        var _this = this;

        // count the number of unique ids in the current chart and calculate the percentage
        this.participantCount.n = d3$1
            .set(
                this.filtered_data.map(function(d) {
                    return d[_this.config.id_col];
                })
            )
            .values().length;
        this.participantCount.percentage = d3$1.format('0.1%')(
            this.participantCount.n / this.participantCount.N
        ); // clear the annotation

        this.participantCount.container.selectAll('*').remove(); // update the annotation

        this.participantCount.container.text(
            '\n'
                .concat(this.participantCount.n, ' of ')
                .concat(this.participantCount.N, ' participant(s) shown (')
                .concat(this.participantCount.percentage, ')')
        );
    }

    function resetRenderer() {
        delete this.highlightedBin;
        delete this.highlighteD; // Remove bin boundaries.

        this.svg.select('g.bin-boundaries').remove(); // Reset bar highlighting.

        this.svg
            .selectAll('.bar-group')
            .classed('selected', false)
            .selectAll('.bar')
            .attr('fill-opacity', 0.75); // Reset footnotes.

        this.footnotes.barClick
            .style({
                'text-decoration': 'none',
                cursor: 'normal'
            })
            .text('Click a bar for details.');
        this.footnotes.barDetails.html('<br>'); // Reset listing.

        this.listing.draw([]);
        this.listing.wrap.style('display', 'none');
    }

    function increasePrecision() {
        var _this = this;

        var ticks = this.x.ticks().map(function(d) {
            return _this.config.x.d3format(d);
        });
        if (
            d3$1
                .nest()
                .key(function(d) {
                    return d;
                })
                .rollup(function(d) {
                    return d.length;
                })
                .entries(ticks)
                .some(function(d) {
                    return d.values > 1;
                })
        )
            this.config.x.format = this.config.x.format1;
    }

    const Vector = function(elements) {
        this.elements = elements;
    };

    Vector.prototype.push = function(value) {
        this.elements.push(value);
    };

    Vector.prototype.map = function(fun) {
        return new Vector(this.elements.map(fun));
    };

    Vector.prototype.length = function() {
        return this.elements.length;
    };

    Vector.prototype.concat = function(x) {
        return new Vector(this.elements.slice(0).concat(x.elements.slice(0)));
    };

    Vector.prototype.abs = function() {
        var values = [];
        for (var i = 0; i < this.elements.length; i++) {
            values.push(Math.abs(this.elements[i]));
        }
        return new Vector(values);
    };

    Vector.prototype.dot = function(v) {
        var result = 0;
        for (var i = 0; i < this.length(); i++) {
            result = result + this.elements[i] * v.elements[i];
        }
        return result;
    };

    Vector.prototype.sum = function() {
        var sum = 0;
        for (var i = 0, n = this.elements.length; i < n; ++i) {
            sum += this.elements[i];
        }
        return sum;
    };

    Vector.prototype.log = function() {
        var result = new Vector(this.elements.slice(0));
        for (var i = 0, n = this.elements.length; i < n; ++i) {
            result.elements[i] = Math.log(result.elements[i]);
        }
        return result;
    };

    Vector.prototype.add = function(term) {
        var result = new Vector(this.elements.slice(0));
        if (term instanceof Vector) {
            for (var i = 0, n = result.elements.length; i < n; ++i) {
                result.elements[i] += term.elements[i];
            }
        } else {
            for (var i = 0, n = result.elements.length; i < n; ++i) {
                result.elements[i] += term;
            }
        }
        return result;
    };

    Vector.prototype.subtract = function(term) {
        return this.add(term.multiply(-1));
    };

    Vector.prototype.multiply = function(factor) {
        var result = new Vector(this.elements.slice(0));
        if (factor instanceof Vector) {
            for (var i = 0, n = result.elements.length; i < n; ++i) {
                result.elements[i] = result.elements[i] * factor.elements[i];
            }
        } else {
            for (var i = 0, n = result.elements.length; i < n; ++i) {
                result.elements[i] = result.elements[i] * factor;
            }
        }
        return result;
    };

    Vector.prototype.pow = function(p) {
        var result = new Vector(this.elements.slice(0));
        if (p instanceof Vector) {
            for (var i = 0, n = result.elements.length; i < n; ++i) {
                result.elements[i] = Math.pow(result.elements[i], p.elements[i]);
            }
        } else {
            for (var i = 0, n = result.elements.length; i < n; ++i) {
                result.elements[i] = Math.pow(result.elements[i], p);
            }
        }
        return result;
    };

    Vector.prototype.mean = function() {
        var sum = 0;
        for (var i = 0, n = this.elements.length; i < n; ++i) {
            sum += this.elements[i];
        }
        return sum / this.elements.length;
    };

    Vector.prototype.geomean = function() {
        return Math.exp(this.log().sum() / this.elements.length);
    };

    Vector.prototype.sortElements = function() {
        var sorted = this.elements.slice(0);
        for (var i = 0, j, tmp; i < sorted.length; ++i) {
            tmp = sorted[i];
            for (j = i - 1; j >= 0 && sorted[j] > tmp; --j) {
                sorted[j + 1] = sorted[j];
            }
            sorted[j + 1] = tmp;
        }
        return sorted;
    };

    Vector.prototype._ecdf = function(x) {
        var sorted = this.sortElements();
        var count = 0;
        for (var i = 0; i < sorted.length && sorted[i] <= x; i++) {
            count++;
        }
        return count / sorted.length;
    };

    Vector.prototype.ecdf = function(arg) {
        if (arg instanceof Vector) {
            var result = new Vector([]);
            for (var i = 0; i < arg.length(); i++) {
                result.push(this._ecdf(arg.elements[i]));
            }
            return result;
        } else {
            return this._ecdf(arg);
        }
    };

    Vector.prototype.sort = function() {
        return new Vector(this.sortElements());
    };

    Vector.prototype.min = function() {
        return this.sortElements()[0];
    };

    Vector.prototype.max = function() {
        return this.sortElements().pop();
    };

    Vector.prototype.toString = function() {
        return '[' + this.elements.join(', ') + ']';
    };

    /*
     * unbiased sample variance
     */

    Vector.prototype.variance = function() {
        return this.ss() / (this.elements.length - 1);
    };

    /*
     * biased sample variance
     */

    Vector.prototype.biasedVariance = function() {
        return this.ss() / this.elements.length;
    };

    /*
     * corrected sample standard deviation
     */

    Vector.prototype.sd = function() {
        return Math.sqrt(this.variance());
    };

    /*
     * uncorrected sample standard deviation
     */

    Vector.prototype.uncorrectedSd = function() {
        return Math.sqrt(this.biasedVariance());
    };

    /*
     * standard error of the mean
     */

    Vector.prototype.sem = function() {
        return this.sd() / Math.sqrt(this.elements.length);
    };

    /*
     * total sum of squares
     */

    Vector.prototype.ss = function() {
        var m = this.mean();
        var sum = 0;
        for (var i = 0, n = this.elements.length; i < n; ++i) {
            sum += Math.pow(this.elements[i] - m, 2);
        }
        return sum;
    };

    /*
     * residuals
     */

    Vector.prototype.res = function() {
        return this.add(-this.mean());
    };

    Vector.prototype.kurtosis = function() {
        return (
            this.res()
                .pow(4)
                .mean() /
            Math.pow(
                this.res()
                    .pow(2)
                    .mean(),
                2
            )
        );
    };

    Vector.prototype.skewness = function() {
        return (
            this.res()
                .pow(3)
                .mean() /
            Math.pow(
                this.res()
                    .pow(2)
                    .mean(),
                3 / 2
            )
        );
    };

    Sequence.prototype = new Vector();

    Sequence.prototype.constructor = Sequence;

    function Sequence(min, max, step) {
        this.elements = [];
        for (var i = min; i <= max; i = i + step) {
            this.elements.push(i);
        }
    }
    var Vector_1 = Vector;
    var Sequence_1 = Sequence;

    var vector = {
        Vector: Vector_1,
        Sequence: Sequence_1
    };

    const Factor = function(elements) {
        this.levels = [];
        this.factors = [];
        for (var i = 0; i < elements.length; i++) {
            if ((index = this.levels.indexOf(elements[i])) != -1) {
                this.factors.push(index);
            } else {
                this.factors.push(this.levels.length);
                this.levels.push(elements[i]);
            }
        }
    };

    Factor.prototype.group = function(g) {
        var indices = [];
        var i = -1;
        while ((i = this.factors.indexOf(g, i + 1)) != -1) {
            indices.push(i);
        }
        return indices;
    };

    Factor.prototype.length = function() {
        return this.factors.length;
    };

    Factor.prototype.groups = function() {
        return this.levels.length;
    };

    var Factor_1 = Factor;

    var factor = {
        Factor: Factor_1
    };

    const Numeric = function() {};

    /*
     * adaptive Simpson
     */

    Numeric._adaptive = function(f, a, b, eps, s, fa, fb, fc, depth) {
        var c = (a + b) / 2;
        var h = b - a;
        var d = (a + c) / 2;
        var e = (c + b) / 2;
        var fd = f(d);
        var fe = f(e);
        var left = (h / 12) * (fa + 4 * fd + fc);
        var right = (h / 12) * (fc + 4 * fe + fb);
        var s2 = left + right;
        if (depth <= 0 || Math.abs(s2 - s) <= 15 * eps) {
            return s2 + (s2 - s) / 15;
        } else {
            return (
                this._adaptive(f, a, c, eps / 2, left, fa, fc, fd, depth - 1) +
                this._adaptive(f, c, b, eps / 2, right, fc, fb, fe, depth - 1)
            );
        }
    };

    Numeric.adaptiveSimpson = function(f, a, b, eps, depth) {
        var c = (a + b) / 2;
        var h = b - a;
        var fa = f(a);
        var fb = f(b);
        var fc = f(c);
        var s = (h / 6) * (fa + 4 * fc + fb);
        return this._adaptive(f, a, b, eps, s, fa, fb, fc, depth);
    };

    /*
     * root finding: bisection
     */

    Numeric.bisection = function(f, a, b, eps) {
        eps = typeof eps !== 'undefined' ? eps : 1e-9;
        while (Math.abs(a - b) > eps) {
            if (f(a) * f((a + b) / 2) < 0) {
                b = (a + b) / 2;
            } else {
                a = (a + b) / 2;
            }
        }
        return (a + b) / 2;
    };

    /*
     * root finding: secant
     */

    Numeric.secant = function(f, a, b, eps) {
        eps = typeof eps !== 'undefined' ? eps : 1e-9;
        var q = [a, b];
        while (Math.abs(q[0] - q[1]) > eps) {
            q.push((q[0] * f(q[1]) - q[1] * f(q[0])) / (f(q[1]) - f(q[0])));
            q.shift();
        }
        return (q[0] + q[1]) / 2;
    };

    var Numeric_1 = Numeric;

    var numeric = {
        Numeric: Numeric_1
    };

    const Misc = function() {};

    /*
     * error function
     */

    Misc.erf = function(z) {
        var term;
        var sum = 0;
        var n = 0;
        do {
            term = (Math.pow(-1, n) * Math.pow(z, 2 * n + 1)) / this.fac(n) / (2 * n + 1);
            sum = sum + term;
            n++;
        } while (Math.abs(term) > 0.000000000001);
        return (sum * 2) / Math.sqrt(Math.PI);
    };

    /*
     * gamma function
     */

    Misc.gamma = function(n) {
        var p = [
            0.99999999999980993,
            676.5203681218851,
            -1259.1392167224028,
            771.32342877765313,
            -176.61502916214059,
            12.507343278686905,
            -0.13857109526572012,
            9.9843695780195716e-6,
            1.5056327351493116e-7
        ];
        var g = 7;
        if (n < 0.5) {
            return Math.PI / (Math.sin(Math.PI * n) * this.gamma(1 - n));
        }
        n -= 1;
        var a = p[0];
        var t = n + g + 0.5;
        for (var i = 1; i < p.length; i++) {
            a += p[i] / (n + i);
        }
        return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * a;
    };

    /*
     * beta function
     */

    Misc.beta = function(x, y) {
        return (this.gamma(x) * this.gamma(y)) / this.gamma(x + y);
    };

    /*
     * incomplete beta function
     */

    Misc.ibeta = function(x, a, b) {
        return numeric.Numeric.adaptiveSimpson(
            function(y) {
                return Math.pow(y, a - 1) * Math.pow(1 - y, b - 1);
            },
            0,
            x,
            0.000000000001,
            10
        );
    };

    /*
     * regularized incomplete beta function
     */

    Misc.rbeta = function(x, a, b) {
        return this.ibeta(x, a, b) / this.beta(a, b);
    };

    /*
     * factorial
     */

    Misc.fac = function(n) {
        var result = 1;
        for (var i = 2; i <= n; i++) {
            result = result * i;
        }
        return result;
    };

    var Misc_1 = Misc;

    var misc = {
        Misc: Misc_1
    };

    /*
     * Normal distribution
     */

    const Normal = function(mean, variance) {
        this.mean = mean;
        this.variance = variance;
    };

    Normal.prototype._de = function(x) {
        return (
            (1 / (Math.sqrt(this.variance) * Math.sqrt(2 * Math.PI))) *
            Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance))
        );
    };

    Normal.prototype._di = function(x) {
        return (
            0.5 * (1 + misc.Misc.erf((x - this.mean) / (Math.sqrt(this.variance) * Math.sqrt(2))))
        );
    };

    Normal.prototype.dens = function(arg) {
        if (arg instanceof vector.Vector) {
            result = new vector.Vector([]);
            for (var i = 0; i < arg.length(); ++i) {
                result.push(this._de(arg.elements[i]));
            }
            return result;
        } else {
            return this._de(arg);
        }
    };

    Normal.prototype.distr = function(arg) {
        if (arg instanceof vector.Vector) {
            result = new vector.Vector([]);
            for (var i = 0; i < arg.length(); ++i) {
                result.push(this._di(arg.elements[i]));
            }
            return result;
        } else {
            return this._di(arg);
        }
    };

    Normal.prototype.inverse = function(x) {
        var a1 = -3.969683028665376e1;
        var a2 = 2.209460984245205e2;
        var a3 = -2.759285104469687e2;
        var a4 = 1.38357751867269e2;
        var a5 = -3.066479806614716e1;
        var a6 = 2.506628277459239;

        var b1 = -5.447609879822406e1;
        var b2 = 1.615858368580409e2;
        var b3 = -1.556989798598866e2;
        var b4 = 6.680131188771972e1;
        var b5 = -1.328068155288572e1;

        var c1 = -7.784894002430293e-3;
        var c2 = -3.223964580411365e-1;
        var c3 = -2.400758277161838;
        var c4 = -2.549732539343734;
        var c5 = 4.374664141464968;
        var c6 = 2.938163982698783;

        var d1 = 7.784695709041462e-3;
        var d2 = 3.224671290700398e-1;
        var d3 = 2.445134137142996;
        var d4 = 3.754408661907416;

        var q, r, y;

        if (x < 0.02425) {
            q = Math.sqrt(-2 * Math.log(x));
            y =
                (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
                ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        } else if (x < 1 - 0.02425) {
            q = x - 0.5;
            r = q * q;
            y =
                ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
                (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
        } else {
            q = Math.sqrt(-2 * Math.log(1 - x));
            y =
                -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
                ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        }

        return y * this.variance + this.mean;
    };

    /*
     * Standard Normal distribution
     */

    StandardNormal.prototype = new Normal();

    StandardNormal.prototype.constructor = StandardNormal;

    function StandardNormal() {
        this.mean = 0;
        this.variance = 1;
    }
    /*
     * T distribution
     */

    const T = function(df) {
        this.df = df;
    };

    T.prototype._de = function(x) {
        return (
            (misc.Misc.gamma((this.df + 1) / 2) /
                (Math.sqrt(this.df * Math.PI) * misc.Misc.gamma(this.df / 2))) *
            Math.pow(1 + Math.pow(x, 2) / this.df, -(this.df + 1) / 2)
        );
    };

    T.prototype._di = function(x) {
        if (x < 0) {
            return 0.5 * misc.Misc.rbeta(this.df / (Math.pow(x, 2) + this.df), this.df / 2, 0.5);
        } else {
            return (
                1 - 0.5 * misc.Misc.rbeta(this.df / (Math.pow(x, 2) + this.df), this.df / 2, 0.5)
            );
        }
    };

    T.prototype.dens = function(arg) {
        if (arg instanceof vector.Vector) {
            result = new vector.Vector([]);
            for (var i = 0; i < arg.length(); ++i) {
                result.push(this._de(arg.elements[i]));
            }
            return result;
        } else {
            return this._de(arg);
        }
    };

    T.prototype.distr = function(arg) {
        if (arg instanceof vector.Vector) {
            result = new vector.Vector([]);
            for (var i = 0; i < arg.length(); ++i) {
                result.push(this._di(arg.elements[i]));
            }
            return result;
        } else {
            return this._di(arg);
        }
    };

    T.prototype.inverse = function(x) {
        return (function(o, x) {
            var t = numeric.Numeric.bisection(
                function(y) {
                    return o._di(y) - x;
                },
                -10.1,
                10
            );
            return t;
        })(this, x);
    };

    /*
     * Kolmogorov distribution
     */

    const Kolmogorov = function() {};

    Kolmogorov.prototype._di = function(x) {
        var term;
        var sum = 0;
        var k = 1;
        do {
            term = Math.exp(
                (-Math.pow(2 * k - 1, 2) * Math.pow(Math.PI, 2)) / (8 * Math.pow(x, 2))
            );
            sum = sum + term;
            k++;
        } while (Math.abs(term) > 0.000000000001);
        return (Math.sqrt(2 * Math.PI) * sum) / x;
    };

    Kolmogorov.prototype.distr = function(arg) {
        if (arg instanceof vector.Vector) {
            result = new vector.Vector([]);
            for (var i = 0; i < arg.length(); ++i) {
                result.push(this._di(arg.elements[i]));
            }
            return result;
        } else {
            return this._di(arg);
        }
    };

    Kolmogorov.prototype.inverse = function(x) {
        return (function(o, x) {
            var t = numeric.Numeric.bisection(
                function(y) {
                    return o._di(y) - x;
                },
                0,
                1
            );
            return t;
        })(this, x);
    };

    /*
     * F distribution
     */

    const F = function(df1, df2) {
        this.df1 = df1;
        this.df2 = df2;
    };

    F.prototype._di = function(x) {
        return misc.Misc.rbeta(
            (this.df1 * x) / (this.df1 * x + this.df2),
            this.df1 / 2,
            this.df2 / 2
        );
    };

    F.prototype.distr = function(arg) {
        if (arg instanceof vector.Vector) {
            result = new vector.Vector([]);
            for (var i = 0; i < arg.length(); ++i) {
                result.push(this._di(arg.elements[i]));
            }
            return result;
        } else {
            return this._di(arg);
        }
    };

    var Normal_1 = Normal;
    var StandardNormal_1 = StandardNormal;
    var T_1 = T;
    var F_1 = F;
    var Kolmogorov_1 = Kolmogorov;

    var distributions = {
        Normal: Normal_1,
        StandardNormal: StandardNormal_1,
        T: T_1,
        F: F_1,
        Kolmogorov: Kolmogorov_1
    };

    const StudentT = function() {};

    StudentT.test = function(first, second) {
        if (second instanceof vector.Vector) {
            return this._twosample(first, second);
        } else {
            return this._onesample(first, second);
        }
    };

    /*
     * two-sample Student's t-test
     */

    StudentT._twosample = function(first, second) {
        var result = {};
        result.se = Math.sqrt(
            first.variance() / first.length() + second.variance() / second.length()
        );
        result.t = (first.mean() - second.mean()) / result.se;
        result.df = first.length() + second.length() - 2;
        var tdistr = new distributions.T(result.df);
        result.p = 2 * (1 - tdistr.distr(Math.abs(result.t)));
        return result;
    };

    /*
     * one-sample Student's t-test
     */

    StudentT._onesample = function(sample, mu) {
        var result = {};
        result.sample = sample;
        result.mu = mu;
        result.se = Math.sqrt(result.sample.variance()) / Math.sqrt(result.sample.length());
        result.t = (result.sample.mean() - result.mu) / result.se;
        result.df = result.sample.length() - 1;
        var tdistr = new distributions.T(result.df);
        result.p = 2 * (1 - tdistr.distr(Math.abs(result.t)));
        return result;
    };

    var StudentT_1 = StudentT;

    var t = {
        StudentT: StudentT_1
    };

    const Regression = function() {};

    /*
     * simple linear regression
     */

    Regression.linear = function(x, y) {
        var result = {};
        result.n = x.length();

        // means

        var mx = x.mean();
        var my = y.mean();

        // parameters

        var rx = x.add(-mx);
        var ry = y.add(-my);

        var ssxx = rx.pow(2).sum();
        var ssyy = ry.pow(2).sum();
        var ssxy = rx.multiply(ry).sum();

        result.slope = ssxy / ssxx;
        result.intercept = my - result.slope * mx;

        // sum of squared residuals

        var ssr = y
            .add(
                x
                    .multiply(result.slope)
                    .add(result.intercept)
                    .multiply(-1)
            )
            .pow(2)
            .sum();

        // residual standard error

        result.rse = Math.sqrt(ssr / (result.n - 2));

        // slope

        var tdistr = new distributions.T(result.n - 2);

        result.slope_se = result.rse / Math.sqrt(ssxx);
        result.slope_t = result.slope / result.slope_se;
        result.slope_p = 2 * (1 - tdistr.distr(Math.abs(result.slope_t)));

        // intercept

        result.intercept_se =
            (result.rse / Math.sqrt(ssxx) / Math.sqrt(result.n)) * Math.sqrt(x.pow(2).sum());
        result.intercept_t = result.intercept / result.intercept_se;
        result.intercept_p = 2 * (1 - tdistr.distr(Math.abs(result.intercept_t)));

        // R-squared

        result.rs = Math.pow(ssxy, 2) / (ssxx * ssyy);

        return result;
    };

    var Regression_1 = Regression;

    var regression = {
        Regression: Regression_1
    };

    const Correlation = function() {};

    /*
     * Pearson correlation
     */

    Correlation.pearson = function(x, y) {
        var result = {};
        var n = x.length();
        var mx = x.mean();
        var my = y.mean();
        result.r =
            x
                .add(-mx)
                .multiply(y.add(-my))
                .sum() /
            Math.sqrt(
                x
                    .add(-mx)
                    .pow(2)
                    .sum() *
                    y
                        .add(-my)
                        .pow(2)
                        .sum()
            );
        result.t = result.r * Math.sqrt((n - 2) / (1 - Math.pow(result.r, 2)));
        result.df = n - 2;
        var tdistr = new distributions.T(result.df);
        result.p = 2 * (1 - tdistr.distr(Math.abs(result.t)));
        return result;
    };

    var Correlation_1 = Correlation;

    var correlation = {
        Correlation: Correlation_1
    };

    const Anova = function() {};

    /*
     * One-way ANOVA
     */

    Anova.oneway = function(x, y) {
        var result = {};

        var vectors = [];
        for (var i = 0; i < x.groups(); i++) {
            var v = new vector.Vector([]);
            var indices = x.group(i);
            for (var j = 0; j < indices.length; j++) {
                v.push(y.elements[indices[j]]);
            }
            vectors.push(v);
        }

        var mean = new vector.Vector([]);
        var n = new vector.Vector([]);
        var v = new vector.Vector([]);
        for (var i = 0; i < vectors.length; i++) {
            mean.push(vectors[i].mean());
            n.push(vectors[i].length());
            v.push(vectors[i].variance());
        }

        result.tdf = x.groups() - 1;
        result.tss = mean
            .add(-y.mean())
            .pow(2)
            .multiply(n)
            .sum();
        result.tms = result.tss / result.tdf;

        result.edf = x.length() - x.groups();
        result.ess = v.multiply(n.add(-1)).sum();
        result.ems = result.ess / result.edf;

        result.f = result.tms / result.ems;

        var fdistr = new distributions.F(result.tdf, result.edf);
        result.p = 1 - fdistr.distr(Math.abs(result.f));

        return result;
    };

    var Anova_1 = Anova;

    var anova = {
        Anova: Anova_1
    };

    const Normality = function() {};

    Normality.shapiroWilk = function(x) {
        const result = {};
        var xx = x.sort();
        var mean = x.mean();
        var n = x.length();
        var u = 1 / Math.sqrt(n);

        // m

        var sn = new distributions.StandardNormal();
        var m = new vector.Vector([]);
        for (var i = 1; i <= n; i++) {
            m.push(sn.inverse((i - 3 / 8) / (n + 1 / 4)));
        }

        // c

        var md = m.dot(m);
        var c = m.multiply(1 / Math.sqrt(md));

        // a

        var an =
            -2.706056 * Math.pow(u, 5) +
            4.434685 * Math.pow(u, 4) -
            2.07119 * Math.pow(u, 3) -
            0.147981 * Math.pow(u, 2) +
            0.221157 * u +
            c.elements[n - 1];
        var ann =
            -3.582633 * Math.pow(u, 5) +
            5.682633 * Math.pow(u, 4) -
            1.752461 * Math.pow(u, 3) -
            0.293762 * Math.pow(u, 2) +
            0.042981 * u +
            c.elements[n - 2];

        var phi;

        if (n > 5) {
            phi =
                (md - 2 * Math.pow(m.elements[n - 1], 2) - 2 * Math.pow(m.elements[n - 2], 2)) /
                (1 - 2 * Math.pow(an, 2) - 2 * Math.pow(ann, 2));
        } else {
            phi = (md - 2 * Math.pow(m.elements[n - 1], 2)) / (1 - 2 * Math.pow(an, 2));
        }

        var a = new vector.Vector([]);
        if (n > 5) {
            a.push(-an);
            a.push(-ann);
            for (var i = 2; i < n - 2; i++) {
                a.push(m.elements[i] * Math.pow(phi, -1 / 2));
            }
            a.push(ann);
            a.push(an);
        } else {
            a.push(-an);
            for (var i = 1; i < n - 1; i++) {
                a.push(m.elements[i] * Math.pow(phi, -1 / 2));
            }
            a.push(an);
        }

        // w

        result.w = Math.pow(a.multiply(xx).sum(), 2) / xx.ss();

        // p

        var g, mu, sigma;

        if (n < 12) {
            var gamma = 0.459 * n - 2.273;
            g = -Math.log(gamma - Math.log(1 - result.w));
            mu = -0.0006714 * Math.pow(n, 3) + 0.025054 * Math.pow(n, 2) - 0.39978 * n + 0.544;
            sigma = Math.exp(
                -0.0020322 * Math.pow(n, 3) + 0.062767 * Math.pow(n, 2) - 0.77857 * n + 1.3822
            );
        } else {
            var u = Math.log(n);
            g = Math.log(1 - result.w);
            mu = 0.0038915 * Math.pow(u, 3) - 0.083751 * Math.pow(u, 2) - 0.31082 * u - 1.5851;
            sigma = Math.exp(0.0030302 * Math.pow(u, 2) - 0.082676 * u - 0.4803);
        }

        var z = (g - mu) / sigma;
        var norm = new distributions.StandardNormal();
        result.p = 1 - norm.distr(z);

        return result;
    };

    var Normality_1 = Normality;

    var normality = {
        Normality: Normality_1
    };

    const Confidence = function() {};

    Confidence.normal = function(x, c) {
        var alpha = 1 - c;
        var t = new distributions.T(x.length() - 1);
        var lower = x.mean() - t.inverse(1 - alpha / 2) * x.sem();
        var upper = x.mean() + t.inverse(1 - alpha / 2) * x.sem();
        return [lower, upper];
    };

    Confidence.normalUpper = function(x, c) {
        var alpha = 1 - c;
        var t = new distributions.T(x.length() - 1);
        return x.mean() + t.inverse(1 - alpha) * x.sem();
    };

    Confidence.normalLower = function(x, c) {
        var alpha = 1 - c;
        var t = new distributions.T(x.length() - 1);
        return x.mean() - t.inverse(1 - alpha) * x.sem();
    };

    var Confidence_1 = Confidence;

    var confidence = {
        Confidence: Confidence_1
    };

    const Power = function() {};

    /*
     * Sample size calculation
     */

    Power.sampleSize = function(a, power, sd, effect) {
        var n = new distributions.Normal(0, 1);
        return (
            (2 * Math.pow(n.inverse(1 - a / 2) + n.inverse(power), 2) * Math.pow(sd, 2)) /
            Math.pow(effect, 2)
        );
    };

    var Power_1 = Power;

    var power = {
        Power: Power_1
    };

    const Nonparametric = function() {};

    /*
     * Two-sample Kolmogorov-Smirnov test
     */

    Nonparametric.kolmogorovSmirnov = function(x, y) {
        var all = new vector.Vector(x.elements.concat(y.elements)).sort();
        var ecdfx = x.ecdf(all);
        var ecdfy = y.ecdf(all);
        var d = ecdfy
            .subtract(ecdfx)
            .abs()
            .max();
        var n = (x.length() * y.length()) / (x.length() + y.length());
        var ks = Math.sqrt(n) * d;
        var p = 1 - new distributions.Kolmogorov().distr(ks);

        return {
            d: d,
            ks: ks,
            p: p
        };
    };

    var Nonparametric_1 = Nonparametric;

    var nonparametric = {
        Nonparametric: Nonparametric_1
    };

    var Vector$1 = vector.Vector;
    var Factor$1 = factor.Factor;
    var Matrix = factor.Matrix;
    var Sequence$1 = vector.Sequence;
    var StudentT$1 = t.StudentT;
    var Misc$1 = misc.Misc;
    var Numeric$1 = numeric.Numeric;
    var Normal$1 = distributions.Normal;
    var StandardNormal$1 = distributions.StandardNormal;
    var T$1 = distributions.T;
    var F$1 = distributions.F;
    var Kolmogorov$1 = distributions.Kolmogorov;
    var Regression$1 = regression.Regression;
    var Correlation$1 = correlation.Correlation;
    var Anova$1 = anova.Anova;
    var Normality$1 = normality.Normality;
    var Confidence$1 = confidence.Confidence;
    var Power$1 = power.Power;
    var Nonparametric$1 = nonparametric.Nonparametric;

    var jerzy = {
        Vector: Vector$1,
        Factor: Factor$1,
        Matrix: Matrix,
        Sequence: Sequence$1,
        StudentT: StudentT$1,
        Misc: Misc$1,
        Numeric: Numeric$1,
        Normal: Normal$1,
        StandardNormal: StandardNormal$1,
        T: T$1,
        F: F$1,
        Kolmogorov: Kolmogorov$1,
        Regression: Regression$1,
        Correlation: Correlation$1,
        Anova: Anova$1,
        Normality: Normality$1,
        Confidence: Confidence$1,
        Power: Power$1,
        Nonparametric: Nonparametric$1
    };

    function runShapiroWilkTest() {
        var _this = this;

        var x = new jerzy.Vector(
            this.raw_data.map(function(d) {
                return +d[_this.config.x.column];
            })
        );
        this.sw = jerzy.Normality.shapiroWilk(x); // Annotate p-value.

        this.wrap.select('span.sh-sw-test').remove();
        this.wrap
            .insert('span', ':first-child')
            .classed('sh-statistical-test sh-sw-test', true)
            .attr(
                'title',
                'The Shapiro-Wilk test tests the null hypothesis that a sample x[1], ..., x[n] came from a normally distributed population.'
            )
            .text('p = '.concat(d3.format('.2f')(this.sw.p)));
    }

    function onDraw() {
        updateParticipantCount.call(this);
        resetRenderer.call(this);
        increasePrecision.call(this);
        runShapiroWilkTest.call(this);
    }

    function drawZeroRangeBar() {
        var _this = this;

        if (
            this.current_data.length === 1 &&
            this.measure.filtered.domain[0] === this.measure.filtered.domain[1]
        ) {
            var width = this.plot_width / 25;
            this.svg
                .selectAll('g.bar-group rect')
                .transition()
                .delay(250) // wait for initial marks to transition
                .attr({
                    x: function x(d) {
                        return _this.x(d.values.x) - width / 2;
                    },
                    width: width
                });
        }
    }

    function defineSettings() {
        var settings = clone(this.settings); // x-axis

        settings.x = Object.assign({}, this.config.x);
        settings.x.label = ''; // y-axis

        settings.y = Object.assign({}, this.config.y);
        settings.y.label = ''; // dimensions

        settings.width = 425;
        settings.height = settings.width / 4;
        settings.resizable = false;
        settings.margin = {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        };
        return settings;
    }

    function runKolmogorovSmirnovTest() {
        var _this = this;

        var x = new jerzy.Vector(
            this.raw_data.map(function(d) {
                return +d[_this.config.x.column];
            })
        );
        var y = new jerzy.Vector(
            this.filtered_data.map(function(d) {
                return +d[_this.config.x.column];
            })
        );
        this.ks = jerzy.Nonparametric.kolmogorovSmirnov(x, y); // Annotate p-value.

        this.wrap
            .select('.wc-chart-title')
            .append('span')
            .classed('sh-statistical-test sh-ks-test', true)
            .attr(
                'title',
                'The Kolmogorov-Smirnov test tests whether two underlying one-dimensional probability distributions differ.'
            )
            .text('p = '.concat(d3.format('.2f')(this.ks.p)));
    }

    function drawSmallMultiples() {
        // Update settings.
        var settings = defineSettings.call(this); // Destroy previously drawn small multiples.

        if (this.multiples) this.multiples.destroy(); // Instantiate small multiples.

        this.multiples = webcharts.createChart(this.containers.multiples.node(), settings);
        this.multiples.on('resize', function() {
            runKolmogorovSmirnovTest.call(this);
        }); // Initialize small multiples.

        webcharts.multiply(this.multiples, this.filtered_data.slice(), this.config.group_by);
    }

    function addHoverBars() {
        var context = this;
        var bins = this.svg.selectAll('.bar-group').each(function(d) {
            var g = d3$1.select(this);
            g.selectAll('.hover-bar').remove(); // Drawing a path instead of a rect because Webcharts messes up the original rect on resize.

            var x = context.x(d.rangeLow);
            var y = 0;
            var width = context.x(d.rangeHigh) - context.x(d.rangeLow);
            var height = context.plot_height;
            var hoverBar = g
                .insert('path', ':first-child')
                .classed('hover-bar', true)
                .attr({
                    d: 'M '
                        .concat(x, ' ')
                        .concat(y, ' V ')
                        .concat(height, ' H ')
                        .concat(x + width, ' V ')
                        .concat(y),
                    fill: 'black',
                    'fill-opacity': 0,
                    stroke: 'black',
                    'stroke-opacity': 0
                });
            d.footnote =
                "<span style = 'font-weight: bold'>".concat(
                    d.values.raw.length,
                    ' records</span> with '
                ) +
                ''.concat(
                    context.measure.current,
                    " values &ge;<span style = 'font-weight: bold'>"
                ) +
                ''
                    .concat(context.config.x.d3format1(d.rangeLow), '</span> and ')
                    .concat(
                        d.rangeHigh < context.config.x.domain[1] ? '&lt;' : '&le;',
                        "<span style = 'font-weight: bold'>"
                    )
                    .concat(context.config.x.d3format1(d.rangeHigh), '</span>');
        });
    }

    function mouseout(element, d) {
        // Update footnote.
        this.footnotes.barDetails.html(
            this.highlightedBin ? 'Table displays '.concat(this.highlighteD.footnote, '.') : '<br>'
        ); // Remove bar highlight.

        var selection = d3$1.select(element);
        selection.selectAll('.bar').attr('stroke', this.colorScale());
    }

    function mouseover(element, d) {
        // Update bar details footnote.
        this.footnotes.barDetails.html('Bar encompasses '.concat(d.footnote, '.')); // Highlight bar.

        var selection = d3$1.select(element);
        if (!/trident/i.test(navigator.userAgent)) selection.moveToFront();
        selection.selectAll('.bar').attr('stroke', 'black');
    }

    function select(element, d) {
        var _this = this;

        // Reduce bin opacity and highlight selected bin.
        this.svg
            .selectAll('.bar-group')
            .selectAll('.bar')
            .attr('fill-opacity', 0.5);
        d3$1.select(element)
            .select('.bar')
            .attr('fill-opacity', 1); // Update bar click footnote

        this.footnotes.barClick
            .style({
                cursor: 'pointer',
                'text-decoration': 'underline'
            })
            .text('Click here to remove details and clear highlighting.')
            .on('click', function() {
                resetRenderer.call(_this);
            }); // Update bar details footnote.

        this.footnotes.barDetails.html('Table displays '.concat(d.footnote, '.')); // Draw listing.

        this.listing.draw(d.values.raw);
        this.listing.wrap.style('display', 'inline-block');
    }

    function deselect(element, d) {
        delete this.highlightedBin;
        delete this.highlighteD;
        this.listing.draw([]);
        this.listing.wrap.style('display', 'none');
        this.svg.selectAll('.bar').attr('fill-opacity', 0.75);
        this.footnotes.barClick
            .style({
                cursor: 'normal',
                'text-decoration': 'none'
            })
            .text('Click a bar for details.');
        this.footnotes.barDetails.text(
            ''.concat(d.values.raw.length, ' records with ') +
                ''.concat(this.measure.current, ' values from ') +
                ''
                    .concat(this.config.x.d3format1(d.rangeLow), ' to ')
                    .concat(this.config.x.d3format1(d.rangeHigh))
        );
    }

    function click(element, d) {
        this.highlightedBin = d.key;
        this.highlighteD = d;
        var selection = d3$1.select(element);
        var selected = selection.classed('selected');
        this.svg.selectAll('.bar-group').classed('selected', false);
        selection.classed('selected', !selected);
        if (!selected) select.call(this, element, d);
        else deselect.call(this, element, d);
    }

    function addBinEventListeners() {
        var context = this;
        var barGroups = this.svg.selectAll('.bar-group').style('cursor', 'pointer');
        barGroups
            .on('mouseover', function(d) {
                mouseover.call(context, this, d);
            })
            .on('mouseout', function(d) {
                mouseout.call(context, this, d);
            })
            .on('click', function(d) {
                click.call(context, this, d);
            });
    }

    function drawNormalRanges() {
        var _this = this;

        this.controls.wrap.select('.normal-range-list').remove();
        this.svg.select('.normal-ranges').remove();

        if (this.config.displayNormalRange && this.filtered_data.length > 0) {
            // Capture distinct normal ranges in filtered data.
            var normalRanges = d3$1
                .nest()
                .key(function(d) {
                    return ''
                        .concat(d[_this.config.normal_col_low], ',')
                        .concat(d[_this.config.normal_col_high]);
                }) // set key to comma-delimited normal range
                .rollup(function(d) {
                    return d.length;
                })
                .entries(this.filtered_data)
                .map(function(d) {
                    d.keySplit = d.key.split(','); // lower

                    d.lower = +d.keySplit[0];
                    d.x1 = d.lower >= _this.x_dom[0] ? _this.x(d.lower) : 0; // upper

                    d.upper = +d.keySplit[1];
                    d.x2 = d.upper <= _this.x_dom[1] ? _this.x(d.upper) : _this.plot_width; // width

                    d.width = d.x2 - d.x1; // tooltip

                    d.rate = d.values / _this.filtered_data.length;
                    d.tooltip =
                        d.values < _this.filtered_data.length
                            ? ''
                                  .concat(d.lower, ' - ')
                                  .concat(d.upper, ' (')
                                  .concat(d3$1.format('%')(d.rate), ' of records)')
                            : ''.concat(d.lower, ' - ').concat(d.upper); // plot if:
                    //  - at least one of the limits of normal fall within the current x-domain
                    //  - the lower limit is less than the current x-domain and the upper limit is greater than current the x-domain

                    d.plot =
                        (_this.x_dom[0] <= d.lower && d.lower <= _this.x_dom[1]) ||
                        (_this.x_dom[0] <= d.upper && d.upper <= _this.x_dom[1]) ||
                        (_this.x_dom[0] >= d.lower && d.upper >= _this.x_dom[1]);
                    return d;
                })
                .sort(function(a, b) {
                    var diff_lower = a.lower - b.lower;
                    var diff_upper = a.upper - b.upper;
                    return diff_lower ? diff_lower : diff_upper ? diff_upper : 0;
                }); // sort normal ranges so larger normal ranges plot beneath smaller normal ranges
            // Add tooltip to Normal Range control that lists normal ranges.

            this.controls.wrap
                .selectAll('#normal-range .wc-control-label')
                .append('span')
                .classed('normal-range-list', true)
                .html(' &#9432')
                .attr(
                    'title',
                    normalRanges.length > 1
                        ? ''.concat(this.measure.current, ' normal ranges:\n').concat(
                              normalRanges
                                  .map(function(normalRange) {
                                      return normalRange.tooltip;
                                  })
                                  .join('\n')
                          )
                        : ''
                              .concat(this.measure.current, ' normal range: ')
                              .concat(normalRanges[0].tooltip)
                )
                .style('cursor', 'default'); // Add groups in which to draw normal range rectangles and annotations.

            var group = this.svg.insert('g', '.bar-supergroup').classed('normal-ranges', true);
            var groups = group
                .selectAll('g.normal-range')
                .data(
                    normalRanges.filter(function(d) {
                        return d.plot;
                    })
                )
                .enter()
                .append('g')
                .classed('normal-range', true); // Draw normal range rectangles.

            var rectangles = groups
                .append('rect')
                .classed('normal-range__rect', true)
                .attr({
                    x: function x(d) {
                        return d.x1;
                    },
                    y: 0,
                    width: function width(d) {
                        return d.width;
                    },
                    height: this.plot_height,
                    stroke: '#c26683',
                    fill: '#c26683',
                    'stroke-opacity': function strokeOpacity(d) {
                        return (d.values / _this.filtered_data.length) * 0.5;
                    },
                    'fill-opacity': function fillOpacity(d) {
                        return (d.values / _this.filtered_data.length) * 0.25;
                    }
                }); // opacity as a function of fraction of records with the given normal range
        }
    }

    function maintainBinHighlighting() {
        var _this = this;

        this.svg.selectAll('.bar').attr('fill-opacity', function(d) {
            return _this.highlightedBin
                ? d.key !== _this.highlightedBin
                    ? 0.5
                    : 1
                : _this.marks[0].attributes['fill-opacity'];
        });
    }

    function removeXAxisTicks() {
        if (this.config.annotate_bin_boundaries) this.svg.selectAll('.x.axis .tick').remove();
    }

    function annotateBinBoundaries() {
        var _this = this;

        if (this.config.annotate_bin_boundaries) {
            // Remove bin boundaries.
            this.svg.select('g.bin-boundaries').remove(); // Check for repeats of values formatted with lower precision.

            var repeats = d3$1
                .nest()
                .key(function(d) {
                    return d.value1;
                })
                .rollup(function(d) {
                    return d.length;
                })
                .entries(this.measure.binBoundaries)
                .some(function(d) {
                    return d.values > 1;
                }); // Annotate bin boundaries.

            var axis = this.svg.append('g').classed('bin-boundaries axis', true);
            var ticks = axis
                .selectAll('g.bin-boundary')
                .data(this.measure.binBoundaries)
                .enter()
                .append('g')
                .classed('bin-boundary tick', true);
            var texts = ticks
                .append('text')
                .attr({
                    x: function x(d) {
                        return _this.x(d.value);
                    },
                    y: this.plot_height,
                    dy: '16px',
                    'text-anchor': 'middle'
                })
                .text(function(d) {
                    return repeats ? d.value2 : d.value1;
                }); // Thin ticks.

            var textDimensions = [];
            texts.each(function(d) {
                var text = d3$1.select(this);
                var bbox = this.getBBox();
                if (
                    textDimensions.some(function(textDimension) {
                        return textDimension.x + textDimension.width > bbox.x - 5;
                    })
                )
                    text.remove();
                else
                    textDimensions.push({
                        x: bbox.x,
                        width: bbox.width,
                        y: bbox.y,
                        height: bbox.height
                    });
            });
        }
    }

    function onResize() {
        // Draw custom bin for single observation subsets.
        drawZeroRangeBar.call(this); // Group bars by group-by variable.

        drawSmallMultiples.call(this); // Add invisible bars for improved hovering.

        addHoverBars.call(this); // Display data listing on bin click.

        addBinEventListeners.call(this); // Visualize normal ranges.

        drawNormalRanges.call(this); // Keep highlighted bin highlighted on resize.

        maintainBinHighlighting.call(this); // Remove x-axis ticks.

        removeXAxisTicks.call(this); // Annotate bin boundaries.

        annotateBinBoundaries.call(this);
    }

    function onDestroy() {
        this.listing.destroy();
        d3$1.select(this.div)
            .selectAll('.loader')
            .remove();
    }

    var callbacks = {
        onInit: onInit,
        onLayout: onLayout,
        onPreprocess: onPreprocess,
        onDatatransform: onDatatransform,
        onDraw: onDraw,
        onResize: onResize,
        onDestroy: onDestroy
    };

    // utilities
    function safetyHistogram() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var containers = layout(element);
        styles(); // Merge and sync settings.

        var mergedSettings = Object.assign(
            {},
            JSON.parse(JSON.stringify(configuration.settings)), // clone settings
            settings
        );
        var syncedSettings = configuration.syncSettings(mergedSettings);
        var controlsSettings = {
            inputs: configuration.syncControlInputs(configuration.controlInputs(), syncedSettings)
        };
        var chartSettings = clone(syncedSettings);
        var multiplesSettings = clone(syncedSettings);
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
        ); // Define controls.

        var controls = webcharts.createControls(containers.controls.node(), controlsSettings); // Define chart.

        var chart = webcharts.createChart(containers.chart.node(), chartSettings, controls);
        chart.settings = clone(chartSettings);

        for (var callback in callbacks) {
            chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);
        } // Define multiples.

        var multiples = webcharts.createChart(containers.multiples.node(), multiplesSettings);
        multiples.settings = clone(multiplesSettings); // Define listing.

        var listing = webcharts.createTable(containers.listing.node(), listingSettings);
        listing.settings = clone(listingSettings); // Attach listing to chart.

        chart.containers = containers;
        chart.multiples = multiples;
        chart.listing = listing;
        listing.chart = chart; // Initialize listing and hide initially.

        listing.init([]);
        listing.wrap.style('display', 'none');
        listing.wrap.selectAll('.table-top,table,.table-bottom').style({
            float: 'left',
            clear: 'left',
            width: '100%'
        });
        listing.table.style('white-space', 'nowrap');
        return chart;
    }

    return safetyHistogram;
});
