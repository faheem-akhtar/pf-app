// eslint-disable pf-rules/export-name-validation

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'pf-rules', 'simple-import-sort', 'testing-library', 'jest-dom'],
  root: true,
  rules: {
    'new-cap': ['error', { newIsCap: true, capIsNew: false }],
    'no-console': 'error',
    'object-shorthand': ['error', 'properties'],
    '@typescript-eslint/no-var-requires': 0,
    'no-irregular-whitespace': 'off',
    // TODO-FE[TPNX-2309] - Remove these once fixed
    'no-lonely-if': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'no-extra-boolean-cast': 'error',
    'no-prototype-builtins': 'error',
    'no-global-assign': 'error',
    'testing-library/consistent-data-testid': [
      'error',
      {
        testIdPattern: '^[a-z]+(-[a-z]+)*$', // enforce the usage of kebab-case
      },
    ],
    'pf-rules/export-name-validation': [
      'error',
      {
        rootFolder: __dirname.split('/').pop(),
        enforcePascalCaseOn: '(enum|component|store|factory|type|interface|template|provider|context|view|service)$',
        ignoreCustomExtensionInNameOn: ['.desktop', '.ae', '.bh', '.eg', '.lb', '.ma', '.qa', '.sa'],
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
      },
    ],
    'pf-rules/must-prefix': [
      'error',
      {
        prefixes: [{ prefix: 'backend', ignoreCase: true }],
      },
    ],
    'pf-rules/forbid-import': [
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
    'react/self-closing-comp': 'error',
    'prefer-const': 'error',
    'no-unneeded-ternary': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000', '^@?\\w'],
          ['^(mocks|stubs)'],
          [
            '^(api|backend|components|constants|config|hooks|context|enums|feature|helpers|library|pages|services|styles|types|views)',
          ],
          ['^'],
          ['^\\.'],
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.tsx', '**/?(*.)+(spec|test).tsx'],
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
      rules: {
        'testing-library/prefer-presence-queries': 'error',
        'testing-library/prefer-user-event': [
          'error',
          {
            allowedMethods: ['mouseDown'],
          },
        ],
        'testing-library/no-wait-for-multiple-assertions': 'error',
        'testing-library/prefer-screen-queries': 'off',
      },
    },
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
        '@typescript-eslint/explicit-function-return-type': ['error'],
        'no-duplicate-imports': 'error',
        '@typescript-eslint/no-inferrable-types': 0,
        // TODO-FE[TPNX-2309] - Remove these once fixed
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: true,
          },
        ],
        '@typescript-eslint/no-duplicate-imports': ['error'],
        '@typescript-eslint/no-var-requires': 1,
        'no-console': 'error',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
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
