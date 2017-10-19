import updateSubjectCount from './util/updateSubjectCount';

export default function onDraw() {
    let context = this;

    //Annotate population count.
    updateSubjectCount(this, '#populationCount');

    //Update x-domain when all values are equal.
    if (this.config.x.type === 'linear' && this.x_dom[0] === this.x_dom[1])
        this.x_dom = [this.x_dom[0] - 1, this.x_dom[1] + 1];
}
