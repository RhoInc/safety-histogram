import { select, format } from 'd3';
import addBoxplot from './addBoxplot';

export default function onResize(){
    const config = this.config;
    const units = this.filtered_data[0] ? this.filtered_data[0][this.config.unit_col] : this.raw_data[0][this.config.unit_col];
    const measure = this.filtered_data[0] ? this.filtered_data[0][this.config.measure_col] : this.raw_data[0][this.config.measure_col];

    //pointer to the linked table
    var myTable = this.table;

    //Show table of values in a bar on click
    var cleanF = format(".3f");
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
        select(this).attr('fill-opacity', 1);
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