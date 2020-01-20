require('@babel/register');
const fs = require('fs');
const fetch = require('node-fetch');
const parse = require('csv-parse/lib/sync');
const d3 = require('d3');
const vector = require('../../src/util/stats/vector').default;
const nonparametric = require('../../src/util/stats/nonparametric').default;
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
        const data1 = data
            .filter(d => d.STRESN !== '')
            .map(d => {
                d.STRESN = +d.STRESN;

                return d;
            });

        const byGroup = d3.merge(
            ['SITE', 'SEX', 'RACE', 'ARM']
                .map(group => {
                    const groupData = data1
                        .map(d => {
                            return {
                                TEST: d.TEST,
                                STRESN: d.STRESN,
                                group,
                                value: d[group],
                            };
                        });

                    return groupData;
                })
        );

        const allResults = d3.nest()
            .key(d => d.TEST)
            .rollup(d => new vector.Vector(d.map(di => di.STRESN)))
            .map(data1);

        const summarized = d3.nest()
            .key(d => [d.TEST, d.group, d.value].join(':|:'))
            .rollup((d,i) => {
                const allMeasureResults = allResults[d[0].TEST];
                const vctr = new vector.Vector(d.map(di => di.STRESN));
                const test = nonparametric.kolmogorovSmirnov(allMeasureResults, vctr);
                test.n = d.length;

                return test;
            })
            .entries(byGroup)
            .map(d => {
                const split = d.key.split(':|:');
                const datum = {
                    TEST: split[0],
                    group: split[1],
                    value: split[2],
                    n: d.values.n,
                    statistic: d.values.d,
                    'p.value': d.values.p,
                };

                return datum;
            })
            .sort((a,b) => (
                a.TEST  < b.TEST  ? -1 :
                a.TEST  > b.TEST  ?  1 :
                a.group < b.group ? -1 :
                a.group > b.group ?  1 :
                a.value < b.value ? -1 : 1
            ));

        return summarized;
    })
    .then(data => {
        writer
            .createObjectCsvWriter({
                path: './test/kolmogorov-smirnov-two-sample-test/results.csv',
                header: Object.keys(data[0]).map(key => { return { id: key, title: key }; }),
            })
            .writeRecords(data)
            .then(() => console.log(`${'-'.repeat(100)}\n  > Output saved to kolmogorov-smirnov-two-sample-test/results.csv.\n${'-'.repeat(100)}`))
            .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
