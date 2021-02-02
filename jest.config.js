module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
  ],
};
