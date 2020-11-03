'use strict'

import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const SERVE = process.env.SERVE === 'true';

const imputFiles = [
  {name: 'main', src: 'src/main.js'}
];

// TBD: Needs tidying

const serveFile = {
  file: 'public/js/',
  format: 'umd',
  globals: {
    jquery: '$'
  },
  sourcemap: true,
  plugins: [terser()]
};

const buildFile = {
  file: 'build/js/',
  format: 'umd',
  globals: {
    jquery: '$'
  },
  sourcemap: true,
  plugins: [terser()]
};

let exports = [];

imputFiles.forEach(file => {
  let { ...outputFile } = SERVE ? serveFile : buildFile;
  outputFile.name += file.name;
  outputFile.file += file.name + '.min.js';

  exports.push({
    input: file.src,
    output: outputFile,
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' })
    ],
    external: ['jquery']
  });
});

export default exports;
