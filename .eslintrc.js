module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'preact', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.jest.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'pf-rules'],
  root: true,
  rules: {
    'new-cap': ['warn', { newIsCap: true, capIsNew: false }],
    'no-console': 'warn',
    'object-shorthand': ['warn', 'properties'],
    'sort-imports': ['warn', { allowSeparatedGroups: true, ignoreCase: true }],
    '@typescript-eslint/no-var-requires': 0,
    'no-irregular-whitespace': 'off',
    // TODO-FE[TPNX-2309] - Remove these once fixed
    'no-lonely-if': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react/no-did-update-set-state': 'warn',
    'react/no-did-mount-set-state': 'warn',
    'react/jsx-no-target-blank': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-prototype-builtins': 'warn',
    'no-global-assign': 'warn',
    'pf-rules/export-name-validation': [
      'error',
      {
        enforcePascalCaseOn: '(enum|component|store|factory|type|interface|template|provider|context|view|service)$',
        ignoreCustomExtensionInNameOn: ['.desktop', '.ae', '.bh', '.eg', '.lb', '.ma', '.qa', '.sa'],
        enforcePrefixOnExtension: [
          {
            extension: 'hook',
            prefix: 'use',
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
    'react/self-closing-comp': 'warn',
    'prefer-const': 'error',
    'no-unneeded-ternary': 'warn',
    // Disabled rules coming from eslint-config-preact
    'jest/no-jasmine-globals': 'off',
    'jest/no-test-callback': 'off',
    'jest/no-identical-title': 'off',
    'jest/expect-expect': 'off',
    'jest/valid-expect-in-promise': 'off',
    'jest/valid-expect': 'off',
    'jest/valid-describe': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['warn'],
        'no-duplicate-imports': 'off',
        '@typescript-eslint/no-inferrable-types': 0,
        // TODO-FE[TPNX-2309] - Remove these once fixed
        '@typescript-eslint/no-empty-interface': [
          'warn',
          {
            allowSingleExtends: true,
          },
        ],
        '@typescript-eslint/no-duplicate-imports': ['warn'],
        '@typescript-eslint/no-var-requires': 1,
        'no-console': 'warn',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/triple-slash-reference': 'warn',
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
/* TS LINT RULES
Rules without equivalent:
- "interface-name": [true, "never-prefix"],
- "no-angle-bracket-type-assertion": false,
- "object-literal-sort-keys": false,
Rules removed because of styling purposes
- whitespace
*/
