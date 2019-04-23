import mouseover from './addBinEventListeners/mouseover';
import mouseout from './addBinEventListeners/mouseout';
import click from './addBinEventListeners/click';
import { mouse } from 'd3';

export default function addBinEventListeners() {
    const context = this;

    const barGroups = this.svg.selectAll('.bar-group').style('cursor', 'pointer');

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
