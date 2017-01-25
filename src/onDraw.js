import updateSubjectCount from './util/updateSubjectCount';

export default function onDraw() {
    updateSubjectCount(this, this.config.id_col, '#populationCount');
}
