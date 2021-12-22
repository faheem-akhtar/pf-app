module.exports = require('./jest-config-factory')({
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.bh\\.(ts|tsx)?$',
  moduleFileExtensions: ['bh.ts', 'bh.tsx', 'ts', 'tsx', 'js', 'jsx'],
});
