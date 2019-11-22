export default function addRemovedRecordsNote() {
    if (this.removedRecords.missing > 0 || this.removedRecords.nonNumeric > 0) {
        const message =
            this.removedRecords.missing > 0 && this.removedRecords.nonNumeric > 0
                ? `${this.removedRecords.missing} record${
                      this.removedRecords.missing > 1 ? 's' : ''
                  } with a missing result and ${this.removedRecords.nonNumeric} record${
                      this.removedRecords.nonNumeric > 1 ? 's' : ''
                  } with a non-numeric result were removed.`
                : this.removedRecords.missing > 0
                ? `${this.removedRecords.missing} record${
                      this.removedRecords.missing > 1 ? 's' : ''
                  } with a missing result ${
                      this.removedRecords.missing > 1 ? 'were' : 'was'
                  } removed.`
                : this.removedRecords.nonNumeric > 0
                ? `${this.removedRecords.nonNumeric} record${
                      this.removedRecords.nonNumeric > 1 ? 's' : ''
                  } with a non-numeric result ${
                      this.removedRecords.nonNumeric > 1 ? 'were' : 'was'
                  } removed.`
                : '';
        this.removedRecords.container = this.controls.wrap
            .append('div')
            .classed('sh-head-note sh-head-note--removed-records', true)
            .text(message);
        this.removedRecords.container
            .append('span')
            .classed('sh-clear-note', true)
            .html('<sup>x</sup>')
            .on('click', () => this.removedRecords.container.style('display', 'none'));
    }
}
