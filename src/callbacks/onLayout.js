import identifyControls from './onLayout/identifyControls';
import addXdomainResetButton from './onLayout/addXdomainResetButton';
import groupControls from './onLayout/groupControls';
import addXdomainZoomButton from './onLayout/addXdomainZoomButton';
import customizeBinsEventListener from './onLayout/customizeBinsEventListener';
import addBinsResetButton from './onLayout/addBinsResetButton';
import addParticipantCountContainer from './onLayout/addParticipantCountContainer';
import addRemovedRecordsContainer from './onLayout/addRemovedRecordsContainer';
import addBorderAboveChart from './onLayout/addBorderAboveChart';
import addFootnoteContainer from './onLayout/addFootnoteContainer';

export default function onLayout() {
    identifyControls.call(this);
    addXdomainResetButton.call(this);
    groupControls.call(this);
    addXdomainZoomButton.call(this);
    customizeBinsEventListener.call(this);
    addBinsResetButton.call(this);
    addParticipantCountContainer.call(this);
    addRemovedRecordsContainer.call(this);
    addBorderAboveChart.call(this);
    addFootnoteContainer.call(this);
}
