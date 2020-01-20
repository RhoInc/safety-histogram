import { format } from 'd3';

export default function pValueFormat(p) {
    const fmt = format('.3f');
    const pFmt =
        p < 0.001
            ? '<0.001***'
            : p === 0.001
            ? '0.001***'
            : p < 0.01
            ? `${fmt(p)}**`
            : p < 0.05
            ? `${fmt(p)}*`
            : p < 0.999
            ? fmt(p)
            : p <= 1.0
            ? '>0.999'
            : 'NA';

    return pFmt;
}
