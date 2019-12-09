require('@babel/register');
const fs = require('fs');
const fetch = require('node-fetch');
const parse = require('csv-parse/lib/sync');
const d3 = require('d3');
const vector = require('../../src/util/stats/vector').default;
const normality = require('../../src/util/stats/normality').default;
const writer = require('csv-writer');

fetch('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv')
    .then(response => response.text())
    .then(text =>
        parse(
            text,
            {
                columns: true
            }
        )
    )
    .then(data => {
        const summarized = d3.nest()
            .key(d => d.TEST)
            .rollup(d => {
                const vctr = new vector.Vector(d.map(di => +di.STRESN));
                const test = normality.shapiroWilk(vctr);
                test.n = d.length;

                return test;
            })
            .entries(
                data.filter(d => d.STRESN !== '')
            )
            .sort((a,b) => a.key < b.key ? -1 : 1)
            .map(d => {
                const datum = {
                    TEST: d.key,
                    n: d.values.n,
                    statistic: d.values.w,
                    'p.value': d.values.p,
                };

                return datum;
            });

        return summarized;
    })
    .then(data => {
        writer
            .createObjectCsvWriter({
                path: './test/shapiro-wilk-normality-test/results.csv',
                header: Object.keys(data[0]).map(key => { return { id: key, title: key }; }),
            })
            .writeRecords(data)
            .then(() => console.log(`${'-'.repeat(100)}\n  > Output saved to shapiro-wilk-normality-test/results.csv.\n${'-'.repeat(100)}`))
            .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
