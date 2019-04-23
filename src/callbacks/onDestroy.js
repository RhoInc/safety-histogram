import { select } from 'd3';

export default function onDestroy() {
    this.listing.destroy();
    select(this.div)
        .selectAll('.loader')
        .remove();
}
