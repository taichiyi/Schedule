import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/sch/Sch.ts',
  output: [
    {
      file: 'dist/sch.umd.js',
      format: 'umd',
      name: 'Sch',
      sourcemap: true
    },
    {
      file: 'dist/sch.js',
      format: 'esm',
      sourcemap: true
    },
  ],
  plugins: [
    typescript(),
  ],
};
