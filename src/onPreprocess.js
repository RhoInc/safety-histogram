export default function onPreprocess() {
  //Capture currently selected filters.
    var filterSettings = [];
    var filters = d3.selectAll('.wc-controls .changer')
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
    var filtered_data = this.raw_data
        .filter(d => {
            var match = true;
            filterSettings.forEach(d1 => {
                if (match === true)
                    match = d[d1.value_col] === d1.value || d1.value === 'All'; });
            return match;
        });
  //Set x domain based on currently filtered data.
    this.config.x.domain = d3.extent(filtered_data, d => +d[settings.value_col]);
}
