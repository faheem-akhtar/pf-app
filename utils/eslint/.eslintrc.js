const mainConfig = require('../../.eslintrc.js');

module.exports = {
  ...mainConfig,
  ignorePatterns: ['dist/*'],
  root: true,
  overrides: [
    {
      files: ['*'],
      rules: {
        'pf-rules/export-name-validation': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-inferrable-types': 0,
      },
    },
  ],
};
