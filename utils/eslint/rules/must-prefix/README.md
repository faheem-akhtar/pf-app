# Must Prefix Rule

The purpose of this lint rule is to enforce naming conventions for exported modules by requiring a specific prefix according to the folder the module lives in.

## Usage:

```js
{
  "pf-rules/must-prefix": [
    "error",
    {
      prefixes: [
        {
          prefix: 'backend',
          ignoreCase: false
        }
      ],
    }
  ]
}
```

Given a file at this path `src/backend/helpers/object/compare.ts` it will accept any name that starts by the prefix:

`backend${name}`.

**_The rule is case sensitive so `Backend${name}` will not work._**

## Options:

This rule accepts and object with the following properties:

### rootFolder

Folder from which to start matching.
Default: `src`.
Example:

- Given a file at this path `src/backend/helpers/object/compare.ts`.
- Given this configuration:

  ```js
  {
      "pf-rules/must-prefix": [
          "error",
          {
            prefixes:[
              {
                prefix: 'backend',
                ignoreCase: false
              }
            ],
            rootFolder: 'helpers'
          }
      ]

  }
  ```

- Only names starting with `object` will be accepted.

### prefixes

List of prefixes to enforce starting from the root folder. It is possible to set to ignore the case or not to be compliant with conflicting rules as well.

Example 1:

- Given a file at this path `src/backend/api/object/compare.ts`.
- Given this configuration:
  ```js
  {
      "pf-rules/must-prefix": [
          "error",
          {
            prefixes:[
              {
                prefix: 'backend',
                ignoreCase: false
              },
              {
                prefix: 'api',
                ignoreCase: false
              }
            ],
            rootFolder: 'src'
          }
      ]
  }
  ```
- Only names starting with `backend` will be accepted. Even though `api` is also parth of the filepath, since `backend` comes first it will match only against `backend`.

Example 2:

- Given a file at this path `src/backend/api/object/compare.ts`.
- Given this configuration:
  ```js
  {
      "pf-rules/must-prefix": [
          "error",
          {
            prefixes:[
              {
                prefix: 'backend',
                ignoreCase: true
              }
            ],
            rootFolder: 'src'
          }
      ]
  }
  ```
- In this case names starting with either `backend` or `Backend` will be accepted.
