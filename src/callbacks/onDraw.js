import updateParticipantCount from './onDraw/updateParticipantCount';
import resetRenderer from './onDraw/resetRenderer';

export default function onDraw() {
    //Annotate population count.  This function is called on draw() so that it can access the
    //filtered data, i.e. the data with the current filters applied.  However the filtered data is
    //mark-specific, which could cause issues in other scenarios with mark-specific filters via the
    //marks.[].values setting.  chart.filtered_data is set to the last mark data defined rather
    //than the full data with filters applied, irrespective of the mark-specific filters.
    updateParticipantCount(this, '#populationCount');

    //Reset chart and listing.  Doesn't really need to be called on draw() but whatever.
    resetRenderer.call(this);
}
