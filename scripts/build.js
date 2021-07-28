#!/usr/bin/env node

var exec = require('child_process').exec;

const checkForErrors = (name, consoleOutput) => {
  if (consoleOutput.includes('Type error:')) {
    console.error(
      `========================\nBuild error for: ${name}\n========================\nconsole output:\n${consoleOutput}\n`
    );
    process.exit(1)
  }
}

function promiseFromChildProcess(child, name) {
  return new Promise(function (resolve, reject) {
    console.log('Started build for', name);
    let consoleOutput = '';

    child.stdout.on('data', function (data) {
      consoleOutput += data;
    });
    child.stderr.on('data', function (data) {
      consoleOutput += data;
    });

    child.addListener('exit', (status) => {
      console.log(
        `========================\nBuild complete for, ${name}. status:${status}\n========================\nconsole output:\n${consoleOutput}================================================\n\n\n`
      );

      checkForErrors(name, consoleOutput);

      if (status === 0) {
        resolve(true);
      } else {
        reject(status);
      }
    });
  });
}

async function build(country, isMobile, retry = true) {
  const name = `${country}-${isMobile ? 'mobile' : 'desktop'}`;
  var child = exec(`PATH=${process.env.PATH} next build`, {
    env: { NEXT_PUBLIC_COUNTRY_CODE: country, NEXT_PUBLIC_MOBILE: isMobile ? '1' : '' },
  });
  try {
    await promiseFromChildProcess(child, name);
  } catch (e) {
    // For some reason nextjs build is sometimes failing when executed in parallel
    // with 14 builds happening in parallel ususally 1 or 2 are failing with some silly error like can not import file because it is not found
    if (retry) {
      console.warn('Retrying', name);
      await build(country, isMobile, false);
    } else {
      console.warn('Retrying failed for', name, 'with', e);
      process.exit(1)
    }
  }
}

const countries = ['bh', 'eg', 'lb', 'ma', 'qa', 'sa', 'ae'];

async function start() {
  await Promise.all(
    countries.reduce((acc, countryCode) => {
      acc.push(build(countryCode, true));
      acc.push(build(countryCode, false));
      return acc;
    }, [])
  );

  console.log(`Build for ${countries.join(',')} mobile / desktop complete.`);
}

start();
