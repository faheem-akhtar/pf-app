module.exports = require('./jest-config-factory')({
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.qa\\.(ts|tsx)?$',
  moduleFileExtensions: ['qa.ts', 'qa.tsx', 'ts', 'tsx', 'js', 'jsx'],
});
