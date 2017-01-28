import updateSubjectCount from './util/updateSubjectCount';

export default function onDraw() {
    let context = this;

  //Annotate population count.
    updateSubjectCount(this, '#populationCount');
}
