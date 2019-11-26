import annotatePercentage from './attachCallbacks/annotatePercentage';
import annotatePValues from './attachCallbacks/annotatePValues';
import addHoverBars from '../addHoverBars';
import addBinEventListeners from '../addBinEventListeners';

export default function attachCallbacks() {
    this.multiples.on('init', function() {
        this.sh = this.parent.sh;
    });

    this.multiples.on('draw', function() {
        annotatePercentage.call(this);
        annotatePValues.call(this);
    });

    this.multiples.on('resize', function() {
        addHoverBars.call(this);
        addBinEventListeners.call(this);
    });
}
