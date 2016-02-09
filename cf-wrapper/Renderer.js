import React from 'react';
import stringAccessor from './string-accessor';
import binding from './binding';
import ReactHistogram from './ReactHistogram';
import { version  as d3_version } from 'd3';
import { version as wc_version } from 'webcharts';

function describeCode(){
    const code = `//uses d3 v.${d3_version}
//uses webcharts v.${wc_version}

var settings = ${JSON.stringify(this.state.settings, null, 2)};

var myChart = histogram(dataElement, settings);

d3.csv(dataPath, function(error, csv) {
  myChart.init(data);
});
    `;
    return code;
}

export default class Renderer extends React.Component {
  constructor(props) {
    super(props);
    this.binding = binding;
    this.describeCode = describeCode.bind(this);
    this.state = {data: [], settings: {}, template: {}, loadMsg: 'Loading...'};
  }
  createSettings(props) {
    const shell = {};
    
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

    this.setState({settings: shell, loadMsg: ''});
  }
  componentWillMount() {
    this.createSettings(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.createSettings(nextProps);
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
