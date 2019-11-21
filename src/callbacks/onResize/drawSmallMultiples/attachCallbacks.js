import runKolmogorovSmirnovTest from './attachCallbacks/runKolmogorovSmirnovTest';

export default function attachCallbacks() {
    this.multiples.on('init', function() {
        this.sh = this.parent.sh;
    });

    this.multiples.on('resize', function() {
        runKolmogorovSmirnovTest.call(this);
    });
}
