import updateParticipantCount from './onDraw/updateParticipantCount';
import resetRenderer from './onDraw/resetRenderer';
import increasePrecision from './onDraw/increasePrecision';

export default function onDraw() {
    updateParticipantCount.call(this);
    resetRenderer.call(this);
    increasePrecision.call(this);
}
