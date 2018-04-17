import addXdomainResetButton from './onLayout/addXdomainResetButton';
import classXaxisLimitControls from './onLayout/classXaxisLimitControls';
import addPopulationCountContainer from './onLayout/addPopulationCountContainer';
import addFootnoteContainer from './onLayout/addFootnoteContainer';

export default function onLayout() {
    //Add button that resets x-domain.
    addXdomainResetButton.call(this);

    //Add x-axis class to x-axis limit controls.
    classXaxisLimitControls.call(this);

    //Add container for population count.
    addPopulationCountContainer.call(this);

    //Add container for footnote.
    addFootnoteContainer.call(this);
}
