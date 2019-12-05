import updateParticipantCount from './onDraw/updateParticipantCount';
import resetRenderer from './onDraw/resetRenderer';
import increasePrecision from './onDraw/increasePrecision';
import runShapiroWilkTest from './onDraw/runShapiroWilkTest';
import runKolmogorovSmirnovTest from './onDraw/runKolmogorovSmirnovTest';

export default function onDraw() {
    updateParticipantCount.call(this);
    resetRenderer.call(this);
    increasePrecision.call(this);
    runShapiroWilkTest.call(this);
    runKolmogorovSmirnovTest.call(this);
}
