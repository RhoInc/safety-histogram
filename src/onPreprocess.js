export default function onPreprocess() {
    let context = this;

  //Capture currently selected filters.
    let filterSettings = [];
    let filters = d3.selectAll('.wc-controls .changer')
        .each(function(d) {
            filterSettings.push(
                {value_col: d.value_col
                ,value:
                    d3.select(this).selectAll('option')
                        .filter(function(d1) {
                            return d3.select(this).property('selected'); })
                        .property('value')});
        });
  //Filter data based on currently selected filters.
    let filtered_data = this.raw_data
        .filter(d => {
            let match = true;
            filterSettings.forEach(d1 => {
                if (match === true)
                    match = d[d1.value_col] === d1.value || d1.value === 'All'; });
            return match;
        });
  //Set x-domain based on currently filtered data.
    this.config.x.domain = d3.extent(filtered_data, d => +d[context.config.value_col]);
}
