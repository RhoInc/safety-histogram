export default function addParticipantCountContainer() {
    this.participantCount.container = this.controls.wrap
        .append('div')
        .classed('sh-head-note sh-head-note--participant-count', true)
        .style({
            display: this.variables.optional.find(definition => definition.property === 'id_col')
                .missing
                ? 'none'
                : 'block'
        });
}
