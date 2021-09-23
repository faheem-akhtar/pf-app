module.exports = require('./jest-config-factory')({
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ma\\.(ts|tsx)?$',
  moduleFileExtensions: ['ma.ts', 'ma.tsx', 'ts', 'tsx', 'js', 'jsx'],
});
