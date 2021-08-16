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
  `ts import { something } from 'forbidden-module'; import { somethingElse } from 'not-forbidden-module'; `
  There will be an error on the first import alone suggesting to change it.

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
  `ts import { useRef, useState, useEffect } from 'react'; `
  An error will appear suggesting to change both `useRef` and `useState`, but not `useEffect`.
