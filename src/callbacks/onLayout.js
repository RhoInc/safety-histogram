import identifyControls from './onLayout/identifyControls';
import customizeGroupByControl from './onLayout/customizeGroupByControl';
import addXdomainResetButton from './onLayout/addXdomainResetButton';
import groupControls from './onLayout/groupControls';
import addXdomainZoomButton from './onLayout/addXdomainZoomButton';
import customizeBinsEventListener from './onLayout/customizeBinsEventListener';
import addParticipantCountContainer from './onLayout/addParticipantCountContainer';
import addRemovedRecordsContainer from './onLayout/addRemovedRecordsContainer';
import addFootnoteContainer from './onLayout/addFootnoteContainer';

export default function onLayout() {
    identifyControls.call(this);
    customizeGroupByControl.call(this);
    addXdomainResetButton.call(this);
    groupControls.call(this);
    addXdomainZoomButton.call(this);
    customizeBinsEventListener.call(this);
    addParticipantCountContainer.call(this);
    addRemovedRecordsContainer.call(this);
    addFootnoteContainer.call(this);
}
