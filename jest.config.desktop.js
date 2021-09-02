module.exports = require('./jest-config-factory')({
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.desktop\\.(ts|tsx)?$',
  moduleFileExtensions: ['desktop.ts', 'desktop.tsx', 'ts', 'tsx', 'js', 'jsx'],
});
