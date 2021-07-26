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
  - `ObjectCompare`
  - `HelpersObjectCompare`

### ignorePascalCase

Checks whether or not for the given name it needs to ignore pascal case in favour of camel case.
This option is an object with 2 properties:

- `regex`: Regular expresion to match the name against
- `match`: Whether or not the regex needs to match or not the name.

Example:

- Given a file at this path `src/helpers/use/constructor.tsx`.
- Given this configuration:
  ```js
  {
      "pf-rules/export-name-validation": [
          "error",
          {
              ignorePascalCase: {
                  regex: '^(use|backend|api|config|feature)',
                  match: true,
              },
          }
      ]
  }
  ```
- Accepted names will be:
  - `useConstructor`
  - `HelpersUseConstructor`
  - `SrcHelpersUseConstructor`
