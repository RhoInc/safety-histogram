import mouseover from './addBinEventListeners/mouseover';
import mouseout from './addBinEventListeners/mouseout';
import click from './addBinEventListeners/click';

export default function addBinEventListeners() {
    const context = this;

    this.svg
        .selectAll('.bar-group')
        .style('cursor', 'pointer')
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
