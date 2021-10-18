# Enforce extension on certain folders

The purpose of this lint rule is to enforce the use of a certain extension when files are placed in a certain folder

## Usage:

```js
{
  "pf-rules/enforce-extension-in-folder": [
    "error",
    {
      foldersAndExtensions: {
        stubs: 'stub'
    }
  ],
}
```

In the example above, it will enforce the extension `stub` on all files present in the `stubs` folder.

## Options

### foldersAndExtensions

Key value object that will be used to determine which extension is needed in the files present in the folder.
The key is the folder name while the value is the extension to enforce.

### rootFolder

Folder to start checking the other folders.

### ignoreBarrelFiles

If set to `true`, it will ignore barrel files.
