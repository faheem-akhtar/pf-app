// eslint-disable @propertyfinder/rules/export-name-validation

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@propertyfinder/rules/recommended-with-testing',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'testing-library/consistent-data-testid': [
      'error',
      {
        testIdPattern: '^[a-z]+(-[a-z]+)*$', // enforce the usage of kebab-case
      },
    ],
    '@propertyfinder/rules/export-name-validation': [
      'error',
      {
        rootFolder: __dirname.split('/').pop(),
        enforcePascalCaseOn: '(enum|component|store|factory|type|interface|template|provider|context|view|service)$',
        ignoreCustomExtensionInNameOn: ['.desktop', '.ae', '.bh', '.eg', '.lb', '.ma', '.qa', '.sa', '.constant'],
        enforcePrefixOnExtension: [
          {
            extension: 'hook',
            prefix: 'use',
          },
          {
            extension: 'mock',
            prefix: 'mock',
          },
        ],
        ignoreFolderInNameOnExtension: [
          {
            extension: 'hook',
            folderName: 'hooks',
          },
          {
            extension: 'stub',
            folderName: 'stubs',
          },
        ],
        // formatWithSeparatorForExtension: [
        //   {
        //     extension: 'constant',
        //     case: 'uppercase', // uppercase || lowercase
        //     separator: '_',
        //   },
        // ],
      },
    ],
    '@propertyfinder/rules/must-prefix': [
      'error',
      {
        prefixes: [{ prefix: 'backend', ignoreCase: true }],
      },
    ],
    '@propertyfinder/rules/forbid-import': [
      'error',
      {
        modules: [
          'next-i18next',
          // {
          //   moduleName: 'backend',
          //   whiteListedFilePaths: ['scripts', 'backend', 'pages'],
          // },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['variable', 'function'],
            modifiers: ['exported'],
            format: ['PascalCase', 'camelCase'],
            filter: {
              regex: '^(use|backend|api|config|feature)',
              match: false,
            },
          },
        ],
      },
    },
  ],
};
