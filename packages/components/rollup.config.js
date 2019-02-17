'use strict';

const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const baseConfig = {
  input: path.resolve(__dirname, './src/index.js'),
  external: ['react', 'react-dom', 'prop-types'],
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      module: true,
    }),
    commonjs({
      include: ['node_modules/**'],
      extensions: ['.js'],
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [require.resolve('@carbonated/babel')],
    }),
  ],
};

module.exports = [
  {
    ...baseConfig,
    output: {
      format: 'esm',
      file: path.join('es', 'index.js'),
    },
  },
  {
    ...baseConfig,
    output: {
      format: 'cjs',
      file: path.join('lib', 'index.js'),
    },
  },
  {
    ...baseConfig,
    output: {
      format: 'umd',
      file: path.join('umd', 'index.js'),
      name: 'CarbonAddonsWebsite',
      globals: {
        'carbon-components': 'CarbonComponents',
        classnames: 'ClassNames',
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
      },
    },
  },
];
