export default function onLayout() {
  //Add footnote.
    this.wrap
        .insert('p', '.wc-chart')
        .attr('class', 'annote')
        .text('Click a bar for details.');

  //Add control to hide or display normal range(s).
    var normalRange = d3.select('.wc-controls')
        .append('div')
        .attr(  {'id': 'NRcheckbox'})
            .append('input')
            .attr(
                {'type': 'checkbox'});
    var NRcheckbox = document.getElementById('NRcheckbox');
    NRcheckbox.innerHTML = NRcheckbox.innerHTML + 'Normal range';
    d3.select('#NRcheckbox input').on('change', function () {
        d3.selectAll('.normalRange')
            .attr('visibility', d3.select(this).property('checked') ? 'visible' : 'hidden'); });
}
