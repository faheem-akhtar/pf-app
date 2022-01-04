module.exports = require('./jest-config-factory')({
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.sa\\.(ts|tsx)?$',
  moduleFileExtensions: ['sa.ts', 'sa.tsx', 'ts', 'tsx', 'js', 'jsx'],
});
