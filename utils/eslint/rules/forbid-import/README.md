# Forbid Import Rule

The purpose of this lint rule is to forbid imports in the app in order to use the agreed ones.

## Usage:

```js
{
  "pf-rules/forbid-import": [
    "error",
    {
      modules: ['forbidden-module'],
      specifiers: ['forbidden-import']
    }
  ]
}
```

## Options:

This rule accepts and object with the following properties:

### modules

List of modules that will be forbidden for use.
Example:

- Given this configuration:

  ```js
  {
      "pf-rules/forbid-import": [
          "error",
          {
            modules: ['forbidden-module'],
          }
      ]

  }
  ```

- Given these imports:
  ```ts
  import { something } from 'forbidden-module';
  import { somethingElse } from 'not-forbidden-module';
  ```

There will be an error on the first import alone suggesting to change it.

#### modules with white listed paths

- Given this configuration:

  ```js
  {
      "pf-rules/forbid-import": [
          "error",
          {
            modules: [
              'forbidden-module',
              {
                moduleName: 'custom-module',
                whiteListedFilePaths: ['services']
              }
            ],
          }
      ]

  }
  ```

- Given these imports:
  ```ts
  import { something } from 'forbidden-module';
  import { customFunction } from 'custom-module';
  ```
- Given the file currently being linted is at `src/services/example`

There will be an error on the first import alone suggesting to change it.
The second `import` although being forbidden, will pass since the file is inside one of the white listed paths

### specifiers

List of specifieres that will be forbidden for use.

Example:

- Given this configuration:
  ```js
  {
      "pf-rules/forbid-import": [
          "error",
          {
            specifiers: ['useRef', 'useState'],
          }
      ]
  }
  ```
- Given these imports:
  ```ts
  import { useRef, useState, useEffect } from 'react';
  ```

An error will appear suggesting to change both `useRef` and `useState`, but not `useEffect`.
