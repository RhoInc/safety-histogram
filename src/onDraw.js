import updateSubjectCount from './util/updateSubjectCount';
import {updateXDomain} from './util/updateXDomain'

export default function onDraw() {
    let context = this;

    //Annotate population count.
    updateSubjectCount(this, '#populationCount');

    //Update x-domain when all values are equal.
    //if (this.config.x.type === 'linear' && this.x_dom[0] === this.x_dom[1])
    //  this.x_dom = [this.x_dom[0] - this.x_dom[0] * 0.05, this.x_dom[1] + this.x_dom[1] * 0.05];

    //Update x-domain based on Control Inputs
    //updateXDomain(this)

    //Reset listing.
    this.listing.draw([]);
    this.listing.wrap.selectAll('*').style('display', 'none');
    this.wrap
        .select('.annote')
        .classed('tableTitle', false)
        .text('Click a bar for details.');

    //Reset bar highlighting.
    delete this.highlightedBin;
    this.svg.selectAll('.bar').attr('opacity', 1);
}
