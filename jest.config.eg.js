module.exports = require('./jest-config-factory')({
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.eg\\.(ts|tsx)?$',
  moduleFileExtensions: ['eg.ts', 'eg.tsx', 'ts', 'tsx', 'js', 'jsx'],
});
