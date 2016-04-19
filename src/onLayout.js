export default function onLayout(){
  //add div for note
  this.wrap.insert('p', '.wc-chart').attr('class', 'annote').text('Click a bar for details.');
}