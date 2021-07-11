const { promisify } = require('util');
const { exec } = require('child_process');
const execPromise = promisify(exec);

const extensionList = [
  'esbenp.prettier-vscode', // Prettier
  'dbaeumer.vscode-eslint', // ESLint
  'stylelint.vscode-stylelint', // Stylelint
];

async function setupVSCode() {
  try {
    console.log('Checking your installed VSCode extensions.');
    const installedExtensionsResult = await execPromise('code --list-extensions');
    const installedExtensions = installedExtensionsResult.stdout.split('\n').reduce((result, current) => {
      if (!!current) {
        result[current] = true;
      }
      return result;
    }, {});

    const extensionsToInstall = extensionList.filter((extension) => !installedExtensions[extension]);

    if (extensionsToInstall.length) {
      console.log('The following extensions will be installed: ', extensionsToInstall);
      console.log('Installing...');
      const results = await Promise.all(
        extensionsToInstall.map((extension) => execPromise(`code --install-extension ${extension}`))
      );
      results.forEach(({ stdout }) => console.log(stdout));
      console.log('All required extensions have been installed.');
    } else {
      console.log('You have all required extensions.');
    }
  } catch ({ stderr }) {
    if (stderr.indexOf('command not found')) {
      console.log('It appears you don\'t have access to the "code" command.');
      console.log("Install it by doing: shift+cmd+p then write 'shell command' on VSCode.");
    } else {
      console.log('There was an error: ', stderr);
    }
  }
}

setupVSCode();
