'use strict'

import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const SERVE = process.env.SERVE === 'true';

let outputFiles = [];

// If we are Serving the files in the Public Folder
if(SERVE) {
  outputFiles.push(
    {
      file: 'public/js/bundle.min.js',
      format: 'umd',
      name: 'library',
      globals: {
        jquery: '$'
      },
      sourcemap: true,
      plugins: [terser()]
    }
  );
}

// Not Serving, create a Bundle and Non Bundle file
if(!SERVE) {
  outputFiles.push(
    {
      file: 'build/bundle.js',
      format: 'umd',
      name: 'library',
      globals: {
        jquery: '$'
      },
      sourcemap: true
    }
  )
  outputFiles.push(
    {
      file: 'build/bundle.min.js',
      format: 'umd',
      name: 'library',
      globals: {
        jquery: '$'
      },
      sourcemap: true,
      plugins: [terser()]
    }
  )
}

export default {
  input: 'src/main.js',
  output: outputFiles,
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' })
  ],
  external: ['jquery']
};