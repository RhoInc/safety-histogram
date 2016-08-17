export default function onLayout() {
  //Add population count.
    d3.select('.wc-controls')
        .append('div')
        .attr('id', 'populationCount')
        .style('font-style', 'italic');

  //Add footnote.
    this.wrap.insert('p', '.wc-chart').attr('class', 'annote').text('Click a bar for details.');

  //Add control to hide or display normal range(s).
    var normalRange = d3.select('.wc-controls')
        .append('div')
        .attr('id', 'NRcheckbox')
        .style('margin', '.5em')
            .append('input')
            .attr('type', 'checkbox');
    var NRcheckbox = document.getElementById('NRcheckbox');
    NRcheckbox.innerHTML = NRcheckbox.innerHTML + 'Normal range';
    d3.select('#NRcheckbox input').on('change', function () {
        d3.selectAll('.normalRange')
            .attr('visibility', d3.select(this).property('checked') ? 'visible' : 'hidden');
    });
}
