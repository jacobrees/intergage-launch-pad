import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'build/js/bundle.js',
      format: 'umd',
      name: 'library',
      globals: {
        jquery: '$'
      },
      sourcemap: true
    },
    {
      file: 'build/js/bundle.min.js',
      format: 'umd',
      name: 'library',
      globals: {
        jquery: '$'
      },
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' })
  ],
  external: ['jquery']
};