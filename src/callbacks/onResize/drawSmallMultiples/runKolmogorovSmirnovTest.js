import jerzy from 'jerzy';

// TODO: fork jerzy and fix the undeclared variables in ./lib/*.js
export default function runKolmogorovSmirnovTest() {
    const x = new jerzy.Vector(this.raw_data.map(d => +d[this.config.x.column]));
    const y = new jerzy.Vector(this.filtered_data.map(d => +d[this.config.x.column]));
    const ks = jerzy.Nonparametric.kolmogorovSmirnov(x,y);

    return ks;
}
