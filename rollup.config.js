import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/schedule-react/ScheduleReact.ts',
  output: [
    {
      file: 'dist/schedule-react.umd.js',
      format: 'umd',
      name: 'ScheduleReact',
      sourcemap: true
    },
    {
      file: 'dist/schedule-react.js',
      format: 'esm',
      sourcemap: true
    },
  ],
  plugins: [
    typescript(),
  ],
};
