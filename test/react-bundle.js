var bundle = (function (React,d3,webcharts) {
	'use strict';

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
			
		],
		chartProperties: [
			{
				source:"start_value",
				target:"start_value"
			}
		]
	}

	const value_col = "STRESN";
	const settings = {
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
	    missingValues: ["NA",""],
	    //Standard webcharts settings
	    x:{
	        "label":null,
	        "type":"linear",
	        "column":value_col,
	        "bin":25, 
	        behavior:'flex', 
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
	            "per":[value_col],
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

	const controlInputs = [ 
	    {label: "Lab Test", type: "subsetter", value_col: "TEST", start: null},
	    {label: "Sex", type: "subsetter", value_col: "SEX"},
	    {label: "Race", type: "subsetter", value_col: "RACE"},
	    {label: "Visit", type: "subsetter", value_col: "VISIT"}
	];

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

	function outlierExplorer(element, settings$$){
		//merge user's settings with defaults
		let mergedSettings = Object.assign({}, settings, settings$$);
		//set some options based on the start_value
		mergedSettings.x.label = mergedSettings.start_value;
		mergedSettings.x.column = mergedSettings.value_col;
		mergedSettings.marks[0].per[0] = mergedSettings.value_col;
		controlInputs[0].value_col = mergedSettings.measure_col;
		controlInputs[0].start = mergedSettings.start_value;
		console.log(settings$$)
		//create controls now
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

	class ReactHistogram extends React.Component {
		constructor(props) {
			super(props);
			this.state = {};
		}
		componentDidMount(prevProps, prevState){
			if(this.props.data.length){
				//manually clear div and redraw
				d3.select(`.chart-div.id-${this.props.id}`).selectAll('*').remove();
				let chart = outlierExplorer(`.chart-div.id-${this.props.id}`, this.props.settings).init(this.props.data);
			}
		}
		componentDidUpdate(prevProps, prevState){
			if(this.props.data.length){
				//manually clear div and redraw
				d3.select(`.chart-div.id-${this.props.id}`).selectAll('*').remove();
				let chart = outlierExplorer(`.chart-div.id-${this.props.id}`, this.props.settings).init(this.props.data);
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

	ReactHistogram.defaultProps = {data: [], controlInputs: [], id: 'id'}

	function describeCode(props){
	  var settings = this.createSettings(props);

	  const code = `//uses d3 v.${d3.version}
//uses webcharts v.${webcharts.version}

var settings = ${JSON.stringify(settings, null, 2)};

var myChart = histogram(dataElement, settings);

d3.csv(dataPath, function(error, csv) {
  myChart.init(data);
});
    `;
	  return code;
	}

	class Renderer extends React.Component {
	  constructor(props) {
	    super(props);
	    this.binding = binding;
	    this.describeCode = describeCode.bind(this);
	    this.state = {data: [], settings: {}, template: {}, loadMsg: 'Loading...'};
	  }
	  createSettings(props) {
	    let shell = Object.assign({}, settings);
	    console.log(shell)
	    binding.dataMappings.forEach(e => {
	      let chartVal = stringAccessor(props.dataMappings, e.source);
	      if(chartVal ){
	        stringAccessor(shell, e.target, chartVal);
	      }
	      else{
	        let defaultVal = stringAccessor(props.template.dataMappings, e.source+'.default');
	        if(defaultVal && typeof defaultVal === 'string' && defaultVal.slice(0,3) === 'dm$'){
	          var pointerVal = stringAccessor(props.dataMappings, defaultVal.slice(3)) || null;
	          stringAccessor(shell, e.target, pointerVal);
	        }
	        else if(defaultVal){
	          stringAccessor(shell, e.target, defaultVal);
	        }
	        else{
	          stringAccessor(shell, e.target, null);
	        }
	      } 
	    });
	    binding.chartProperties.forEach(e => {
	      let chartVal = stringAccessor(props.chartProperties, e.source);

	      if(chartVal !== undefined){
	        stringAccessor(shell, e.target, chartVal);
	      }
	      else{
	        let defaultVal = stringAccessor(props.template.chartProperties, e.source+'.default');
	        stringAccessor(shell, e.target, defaultVal);
	      } 
	    });

	    return shell;
	  }
	  componentWillMount() {
	    var settings = this.createSettings(this.props);
	    this.setState({settings: settings});
	    console.log(this.props)
	  }
	  componentWillReceiveProps(nextProps){
	    var settings = this.createSettings(nextProps);
	    this.setState({settings: settings});
	    console.log(settings)
	  }
	  render() {
	    return (
	      React.createElement(ReactHistogram, {
	        id: this.props.id,
	        settings: this.state.settings, 
	        controlInputs: this.props.template.controls,
	        data: this.props.data
	      })
	    );
	  }
	}

	return Renderer;

}(React,d3,webCharts));