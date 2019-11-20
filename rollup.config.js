import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

export default {
    input: pkg.module,
    output: {
        name: pkg.name
            .split('-')
            .map((str,i) =>
                i === 0 ?
                    str :
                    (str.substring(0,1).toUpperCase() + str.substring(1))
            )
            .join(''),
        file: pkg.main,
        format: 'umd',
        globals: {
            d3: 'd3',
            webcharts: 'webCharts'
        },
    },
    external: (function() {
        const dependencies = Object.keys(pkg.dependencies)
            .filter(dependency => dependency !== 'jerzy');

        return dependencies;
    }()),
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [
                [ '@babel/preset-env' ]
            ],
            //plugins: [
            //    '@babel/plugin-external-helpers'
            //],
            babelrc: false
        }),
        commonjs(),
        json({
            include: ['settings-schema.json']
        }),
        nodeResolve(),
    ]
};
