# Export Name Rule

The purpose of this lint rule is to enforce naming conventions for exported modules.

## Usage:

```js
{
  "pf-rules/export-name-validation": [
    "error"
  ]
}
```

In the basic form it will enforce pascal case naming for exported modules according to the path of the file, for example:

Given a file at this path `src/helpers/object/compare.ts` it will accept the following names:

- `ObjectCompare`
- `HelpersObjectCompare`
- `SrcHelpersObjectCompare`

## Options:

This rule accepts and object with the following properties:

### rootFolder

Folder at which to stop giving suggestions.
Default: `src`.
Example:

- Given a file at this path `src/helpers/object/compare.ts`.
- Given this configuration:

  ```js
  {
      "pf-rules/export-name-validation": [
          "error",
          {
              rootFolder: 'helpers'
          }
      ]
  }
  ```

- Accepted names will be:
  - `objectCompare`
  - `helpersObjectCompare`

### enforcePascalCaseOn

Enforces the use of pascal case according to regex match.

Example:

- Given a file at this path `src/components/filter/component.tsx`.
- Given this configuration:
  ```js
  {
      "pf-rules/export-name-validation": [
          "error",
          {
              enforcePascalCaseOn: '(component|template)$',
          }
      ]
  }
  ```
- Accepted names will be:

  - `FilterComponent`
  - `ComponentsFilterComponent`
  - `SrcComponentsFilterComponent`

- Without the rule, accepted names would be:
  - `filterComponent`
  - `componentsFilterComponent`
  - `srcComponentsFilterComponent`

### enforcePrefixOnExtension

Enforces the use of a specific prefix according to a specific extension and replacing the extension itself from the name.

Example:

- Given a file at this path `src/helpers/object/compare.hook.ts`.
- Given this configuration:
  ```js
  {
      "pf-rules/export-name-validation": [
          "error",
          {
              enforcePrefixOnExtension: [
                {
                  extension: 'hook',
                  prefix: 'use',
                },
              ],
          }
      ]
  }
  ```
- Accepted names will be:

  - `useObjectCompare`
  - `useHelpersObjectCompare`
  - `useSrcHelpersObjectCompare`

- Without the rule, accepted names would be:
  - `ObjectCompareHook`
  - `HelpersObjectCompareHook`
  - `SrcHelpersObjectCompareHook`
