module.exports = {
  // Coverage information
  collectCoverageFrom: [
    './src/**/*.ts',
    './src/**/*.tsx',
    '!./src/**/*.enum.ts',
    '!./src/**/*.stories.ts',
    '!./src/**/*.mock.ts',
    '!./src/**/*.interface.ts',
    '!./src/**/index.ts',
    '!./src/environments/**',
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
  // Mocking static assets
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },

  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
  setupFilesAfterEnv: ['<rootDir>/setup-enzyme.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$'],
  globals: {
    'ts-jest': {
      // Ignore suggestion to update this, it doesn't work
      tsConfigFile: '<rootDir>/tsconfig.jest.json',
      diagnostics: false,
    },
  },
};
