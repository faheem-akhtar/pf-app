// setup file for jest
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });

module.exports = {
  // Coverage information
  collectCoverageFrom: ['./src/**/*.ts', './src/**/*.tsx'],
  coveragePathIgnorePatterns: [
    'src/components/icon/*',
    'mocks/*',
    '.enum.ts',
    '.interface.ts',
    '.type.ts',
    '.stories.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['text', 'html'],
  moduleNameMapper: {
    ...require('jest-module-name-mapper').default(),
    // Mocking static assets
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'mocks/fileMock.js',
    '\\.(css|scss)$': 'mocks/styleMock.js',
  },
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      '@swc/jest',
      {
        sourceMaps: true,
        jsc: {
          target: 'es2021',
        },
      },
    ],
  },

  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
  setupFilesAfterEnv: ['<rootDir>/setup-enzyme.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$'],
};
