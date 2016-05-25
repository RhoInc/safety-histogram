(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('d3'), require('webcharts')) :
	typeof define === 'function' && define.amd ? define(['react', 'd3', 'webcharts'], factory) :
	(global.safetyHistogram = factory(global.React,global.d3,global.webCharts));
}(this, function (React,d3,webcharts) { 'use strict';

	React = 'default' in React ? React['default'] : React;

	function stringAccessor(o, s, v) {
		//adapted from http://jsfiddle.net/alnitak/hEsys/
	    s = s.replace(/\[(\w+)\]/g, '.$1');
	    s = s.replace(/^\./, '');           
	    var a = s.split('.');
	    for (var i = 0, n = a.length; i < n; ++i) {
	        var k = a[i];
	        if (k in o) {
	            if(i == n-1 && v !== undefined)
	                o[k] = v;
	            o = o[k];
	        } else {
	            return;
	        }
	    }
	    return o;
	}

	var binding = {
		dataMappings : [
		//custom settings
		{
			source: 'id_col',
			target: 'id_col'
		},
		{
			source: 'time_col',
			target: 'time_col'
		},
		{
			source: 'measure_col',
			target: 'measure_col'
		},
		{
			source: 'value_col',
			target: 'value_col'
		},
		{
			source: 'unit_col',
			target: 'unit_col'
		},
		{
			source: 'sex_col',
			target: 'sex_col'
		},
		{
			source: 'race_col',
			target: 'race_col'
		},
		{
			source: 'normal_col_low',
			target: 'normal_col_low'
		},
		{
			source: 'normal_col_high',
			target: 'normal_col_high'
		},
		{
			source: 'start_value',
			target: 'start_value'
		},
		{
			source: 'rotate_x',
			target: 'rotateX'
		},
		{
			source: 'missing_values',
			target: 'missingValues'
		},
		// webcharts settings
			{
				source:"x",
				target:"x.column"
			},
			{
				source:"x_order",
				target:"x.order"
			},
			{
				source:"x_domain",
				target:"x.domain"
			},
			{
				source:"y",
				target:"y.column"
			},
			{
				source:"y_order",
				target:"y.order"
			},
			{
				source:"y_domain",
				target:"y.domain"
			},
			{
				source:"group",
				target:"marks.0.per"
			},
			{
				source:"subgroup",
				target:"marks.0.split"
			},
			{
				source:"subset",
				target:"marks.0.values"
			},
			{
				source:"group2",
				target:"marks.1.per"
			},
			{
				source:"subgroup2",
				target:"marks.1.split"
			},
			{
				source:"subset2",
				target:"marks.1.values"
			},
			{
				source:"color_by",
				target:"color_by"
			},
			{
				source:"legend_order",
				target:"legend.order"
			},
			{
				source:"tooltip",
				target:"marks.0.tooltip"
			}
		],
		chartProperties: [
			{
				source:"date_format",
				target:"date_format"
			},
			{
				source:"x_label",
				target:"x.label"
			},

			{
				source:"x_type",
				target:"x.type"
			},
			{
				source:"x_format",
				target:"x.format"
			},
			{
				source:"x_sort",
				target:"x.sort"
			},
			{
				source:"x_bin",
				target:"x.bin"
			},
			{
				source:"x_behavior",
				target:"x.behavior"
			},
			{
				source:"y_label",
				target:"y.label"
			},
			{
				source:"y_type",
				target:"y.type"
			},
			{
				source:"y_format",
				target:"y.format"
			},
			{
				source:"y_sort",
				target:"y.sort"
			},
			{
				source:"y_bin",
				target:"y.bin"
			},
			{
				source:"y_behavior",
				target:"y.behavior"
			},
			{
				source:"marks_type",
				target:"marks.0.type"
			},
			{
				source:"marks_summarizeX",
				target:"marks.0.summarizeX"
			},
			{
				source:"marks_summarizeY",
				target:"marks.0.summarizeY"
			},
			{
				source:"marks_arrange",
				target:"marks.0.arrange"
			},
			{
				source:"marks_fill_opacity",
				target:"marks.0.attributes.fill-opacity"
			},
			{
				source:"marks_tooltip",
				target:"marks.0.tooltip"
			},
			{
				source:"marks_text",
				target:"marks.0.text"
			},
			{
				source:"marks2_type",
				target:"marks.1.type"
			},
			{
				source:"marks2_summarizeX",
				target:"marks.1.summarizeX"
			},
			{
				source:"marks2_summarizeY",
				target:"marks.1.summarizeY"
			},
			{
				source:"marks2_arrange",
				target:"marks.1.arrange"
			},
			{
				source:"marks2_fill_opacity",
				target:"marks.1.attributes.fill-opacity"
			},
			{
				source:"marks2_tooltip",
				target:"marks.1.tooltip"
			},
			{
				source:"marks2_text",
				target:"marks.1.text"
			},
			{
				source:"transitions",
				target:"transitions"
			},
			{
				source:"aspect_ratio",
				target:"aspect"
			},
			{
				source:"range_band",
				target:"range_band"
			},
			{
				source:"colors",
				target:"colors"
			},
			{
				source:"gridlines",
				target:"gridlines"
			},
			{
				source:"max_width",
				target:"max_width"
			},
			{
				source:"width",
				target:"width"
			},
			{
				source:"height",
				target:"height"
			},
			{
				source:"margin_top",
				target:"margin.top"
			},
			{
				source:"margin_bottom",
				target:"margin.bottom"
			},
			{
				source:"margin_left",
				target:"margin.left"
			},
			{
				source:"margin_right",
				target:"margin.right"
			},
			{
				source:"resizable",
				target:"resizable"
			},
			{
				source:"scale_text",
				target:"scale_text"
			},
			{
				source: "legend_mark",
				target: "legend.mark"
			},
			{
				source: "legend_label",
				target: "legend.label"
			},
			{
				source: "legend_location",
				target: "legend.location"
			}
		]
	}

	const settings = {
	    //Addition settings for this template
	    id_col: "USUBJID",
	    time_col: "VISITN",
	    measure_col: "TEST",
	    value_col: "STRESN",
	    unit_col: "STRESU",
	    sex_col:"SEX",
	    race_col:"RACE",
	    normal_col_low: "STNRLO",
	    normal_col_high: "STNRHI",
	    start_value: null,
	    rotateX: true,
	    missingValues: ["NA",""],

	    //Standard webcharts settings
	    x:{
	        "column":null, //set in syncSettings()
	        "label":null, //set in syncSettings()
	        "type":"linear",
	        "bin":25, 
	        "behavior":'flex', 
	        "format":'.1f'
	    },
	    y:{
	        "label":"# of Measures",
	        "type":"linear",
	        "behavior": 'flex',
	        "column":"",
	        "domain":[0,null]
	    },
	    marks:[
	        {   
	            "per":[], //set in syncSettings()
	            "type":"bar",
	            "summarizeY":"count",
	            "summarizeX":"mean",
	            "attributes":{"fill-opacity":0.75}
	        }
	    ],
	    "legend":{
	        "mark":"square",
	        "label":"cohort"
	    },
	    "aspect":1.66,
	    "max_width":"800"
	};

	// Replicate settings in multiple places in the settings object
	function syncSettings(settings){
		settings.x.label = settings.start_value;
		settings.x.column = settings.value_col;
		settings.marks[0].per[0] = settings.value_col;
		
		return settings;
	}

	// Default Control objects
	const controlInputs = [ 
		{label: "Lab Test", type: "subsetter", value_col: "TEST", start: null},
	    {label: "Sex", type: "subsetter", value_col: "SEX"},
	    {label: "Race", type: "subsetter", value_col: "RACE"},
	    {label: "Visit", type: "subsetter", value_col: "VISITN"}
	];

	// Map values from settings to control inputs
	function syncControlInputs(controlInputs, settings){
	    var labTestControl = controlInputs.filter(function(d){return d.label=="Lab Test"})[0] 
		labTestControl.value_col = settings.measure_col;
		labTestControl.start = settings.start_value;   

	    var sexControl = controlInputs.filter(function(d){return d.label=="Sex"})[0] 
	    sexControl.value_col = settings.sex_col;    

	    var raceControl = controlInputs.filter(function(d){return d.label=="Race"})[0] 
	    raceControl.value_col = settings.race_col;

	    var visitControl = controlInputs.filter(function(d){return d.label=="Visit"})[0] 
	    visitControl.value_col = settings.time_col;
	 
		return controlInputs
	}

	function onInit(){
	    const config = this.config;
	    const allMeasures = d3.set(this.raw_data.map(m => m[config.measure_col])).values();

	    // "All" variable for non-grouped comparisons
	    this.raw_data.forEach(e => e[config.measure_col] = e[config.measure_col].trim() );
	    
	    //Drop missing values
	    this.raw_data = this.raw_data.filter(f => {
	        return config.missingValues.indexOf(f[config.value_col]) === -1;
	    })

	    //warning for non-numeric endpoints
	    var catMeasures = allMeasures
	        .filter(f => {
	            var measureVals = this.raw_data
	                .filter(d => d[config.measure_col] === f);

	            return webcharts.dataOps.getValType(measureVals, config.value_col) !== "continuous";
	        });
	    if(catMeasures.length){
	        console.warn(catMeasures.length + " non-numeric endpoints have been removed: "+catMeasures.join(", "))    
	    }
	    
	    //delete non-numeric endpoints
	    var numMeasures = allMeasures
	        .filter(f => {
	            var measureVals = this.raw_data
	                .filter(d => d[config.measure_col] === f );

	            return webcharts.dataOps.getValType(measureVals, config.value_col) === "continuous";
	        });

	    this.raw_data = this.raw_data.filter(f => numMeasures.indexOf(f[config.measure_col]) > -1 );

	    //Choose the start value for the Test filter
	    this.controls.config.inputs[0].start = this.config.start_value || numMeasures[0]; 

	};

	function onLayout(){
	 //add div for note
	  this.wrap.insert('p', '.wc-chart').attr('class', 'annote').text('Click a bar for details.');
	}

	function onDataTransform(){
	  const units = this.filtered_data[0] ? this.filtered_data[0][this.config.unit_col] : this.raw_data[0][this.config.unit_col];
	  const measure = this.filtered_data[0] ? this.filtered_data[0][this.config.measure_col] : this.raw_data[0][this.config.measure_col];
	  //Customize the x-axis label
	  this.config.x.label = measure+" level ("+units+")";

	  //Reset linked table
	  this.table.draw([]);
	  this.svg.selectAll('.bar').attr('opacity', 1);
	}

	function onDraw(){

	}

	function onResize(){
	    const config = this.config;
	    const units = this.filtered_data[0] ? this.filtered_data[0][this.config.unit_col] : this.raw_data[0][this.config.unit_col];
	    const measure = this.filtered_data[0] ? this.filtered_data[0][this.config.measure_col] : this.raw_data[0][this.config.measure_col];

	    //pointer to the linked table
	    var myTable = this.table;

	    //Show table of values in a bar on click
	    var cleanF = d3.format(".3f");
	    var myBars = this.svg.selectAll('.bar');

	    var note = this.wrap.select('.annote');

	    myBars
	    .style('cursor', 'pointer')
	    .on('click', function(d){
	        note
	            .classed("tableTitle",true)
	            .text("Table shows "+d.values.raw.length +" records with "+measure+" values from "+cleanF(d.rangeLow)+" to "+cleanF(d.rangeHigh)+" "+units+".")

	        myTable.draw(d.values.raw);
	        myBars.attr('fill-opacity', 0.5)
	        d3.select(this).attr('fill-opacity', 1);
	    })
	    //Show # of values + range of a bar on mouseover 
	    .on('mouseover' ,function(d){
	        if(note.classed("tableTitle")==false){
	            note.text(d.values.raw.length +" records with "+measure+" values from "+cleanF(d.rangeLow)+" to "+cleanF(d.rangeHigh)+" "+units+".")
	        }
	    })
	    .on('mouseout',function(d){
	        if( note.classed("tableTitle")==false){
	            note.text("Click a bar for details.")
	        }
	    })

	    this.svg.select('.overlay').on('click', function(){
	        myTable.draw([]);
	        myBars.attr('fill-opacity', 0.75);
	        if(note.classed("tableTitle")){
	            note
	            .classed("tableTitle",false)
	            .text("Click a bar for details.")
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

	function safetyHistogram(element, settings$$){
		
		//merge user's settings with defaults
		let mergedSettings = Object.assign({}, settings, settings$$);

		//keep settings in sync with the data mappings
		mergedSettings = syncSettings(mergedSettings);
		
		//keep control inputs in sync and create controls object
		let syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
		let controls = webcharts.createControls(element, {location: 'top', inputs: controlInputs});
		
		//create chart
		let chart = webcharts.createChart(element, mergedSettings, controls);
		chart.on('init', onInit);
		chart.on('layout', onLayout);
		chart.on('datatransform', onDataTransform);
		chart.on('draw', onDraw);
		chart.on('resize', onResize);

		let table = webcharts.createTable(element, {}).init([]);
		chart.table = table;

		return chart;
	}

	class ReactYourProjectName extends React.Component {
		constructor(props) {
			super(props);
			this.state = {};
		}
		componentDidMount(prevProps, prevState){
			if(this.props.data.length){
				//manually clear div and redraw
				d3.select(`.chart-div.id-${this.props.id}`).selectAll('*').remove();
				let chart = safetyHistogram(`.chart-div.id-${this.props.id}`, this.props.settings).init(this.props.data);
			}
		}
		componentDidUpdate(prevProps, prevState){
			if(this.props.data.length){
				//manually clear div and redraw
				d3.select(`.chart-div.id-${this.props.id}`).selectAll('*').remove();
				let chart = safetyHistogram(`.chart-div.id-${this.props.id}`, this.props.settings).init(this.props.data);
			}
		}
		render(){
			return (
				React.createElement('div', {
					key: this.props.id,
					className: `chart-div id-${this.props.id} ${!(this.props.data.length) ? 'loading' : ''}`,
					style: { minHeight: '1px', minWidth: '1px' }
				})
			);
		}
	}

	ReactYourProjectName.defaultProps = {data: [], controlInputs: [], id: 'id'}

	function describeCode(props) {
	  const settings = this.createSettings(props);
	  const code =
	`// uses d3 v.${d3.version}
// uses webcharts v.${webcharts.version}
// uses safety-histogram v.1.2.0

var settings = ${JSON.stringify(settings, null, 2)};

var myChart = safetyHistogram(dataElement, settings);

d3.csv(dataPath, function(error, csv) {
  myChart.init(csv);
});
`;
	  return code;
	}


	class Renderer extends React.Component {
	  constructor(props) {
	    super(props);
	    this.binding = binding;
	    this.describeCode = describeCode.bind(this);
	    this.state = { data: [], settings: {}, template: {}, loadMsg: 'Loading...' };
	  }
	  createSettings(props) {
	    // set placeholders for anything the user can change
	    const shell = settings;

	    binding.dataMappings.forEach(e => {
	      let chartVal = stringAccessor(props.dataMappings, e.source);
	      if (chartVal) {
	        stringAccessor(shell, e.target, chartVal);
	      }
	      else {
	        let defaultVal = stringAccessor(props.template.dataMappings, e.source+'.default');
	        if (defaultVal && typeof defaultVal === 'string' && defaultVal.slice(0,3) === 'dm$') {
	          var pointerVal = stringAccessor(props.dataMappings, defaultVal.slice(3)) || null;
	          stringAccessor(shell, e.target, pointerVal);
	        }
	        else if(defaultVal){
	          stringAccessor(shell, e.target, defaultVal);
	        }
	      }
	    });
	    binding.chartProperties.forEach(e => {
	      let chartVal = stringAccessor(props.chartProperties, e.source);
	      if (chartVal !== undefined) {
	        stringAccessor(shell, e.target, chartVal);
	      }
	      else {
	        let defaultVal = stringAccessor(props.template.chartProperties, e.source+'.default');
	        stringAccessor(shell, e.target, defaultVal);
	      }
	    });

	    return syncSettings(shell);
	  }
	  componentWillMount() {
	    var settings = this.createSettings(this.props);
	    this.setState({ settings });
	  }
	  componentWillReceiveProps(nextProps){
	    var settings = this.createSettings(nextProps);
	    this.setState({ settings });
	  }
	  render() {
	    return (
	      React.createElement(ReactYourProjectName, {
	        id: this.props.id,
	        settings: this.state.settings,
	        controlInputs: this.props.template.controls,
	        data: this.props.data
	      })
	    );
	  }
	}

	return Renderer;

}));