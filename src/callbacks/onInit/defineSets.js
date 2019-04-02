import participant from './defineSets/participant';
import measure from './defineSets/measure';

export default function defineSets() {
    participant.call(this);
    measure.call(this);
}
