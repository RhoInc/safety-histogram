import annotatePercentage from './attachCallbacks/annotatePercentage';
import runKolmogorovSmirnovTest from './attachCallbacks/runKolmogorovSmirnovTest';
import addHoverBars from '../addHoverBars';
import addBinEventListeners from '../addBinEventListeners';

export default function attachCallbacks() {
    this.multiples.on('init', function() {
        this.sh = this.parent.sh;
    });

    this.multiples.on('draw', function() {
        annotatePercentage.call(this);
    });

    this.multiples.on('resize', function() {
        runKolmogorovSmirnovTest.call(this);
        addHoverBars.call(this);
        addBinEventListeners.call(this);
    });
}
