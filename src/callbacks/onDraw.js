import updateParticipantCount from './onDraw/updateParticipantCount';
import resetRenderer from './onDraw/resetRenderer';

export default function onDraw() {
    updateParticipantCount.call(this);
    resetRenderer.call(this);
}
