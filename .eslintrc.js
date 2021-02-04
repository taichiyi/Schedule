const OFF = 0;
const WARNNING = 2;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': [
      ERROR,
      {
        bracketSpacing: false,
        jsxBracketSameLine: true,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        proseWrap: 'never',
        arrowParens: 'always',
      }
    ],
  },
};
