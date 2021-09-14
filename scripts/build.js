#!/usr/bin/env node

const os = require('os');
const cpuCount = os.cpus().length;

const { exec } = require('child_process');
const countries = require('./countries');

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
      if (status === 0) {
        resolve(true);
      } else {
        reject(status);
      }
    });
  });
}

// We need to limit the number of maximum workers to 4
// because on the jenkins we have 8 cores machines shared between projects
// and consuming all 8 cores interupting other build processes.
const MAX_ALLOWED_WORKERS = 4;

let availableWorkers = Math.min(MAX_ALLOWED_WORKERS, cpuCount);

const lockWorker = () => {
  availableWorkers -= 1;
};

const unlockWorker = () => {
  availableWorkers += 1;
};

async function build(country, isMobile, retry = true) {
  while (availableWorkers === 0) {
    // check  for available workers every seconds
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  lockWorker();
  const name = `${country}-${isMobile ? 'mobile' : 'desktop'}`;
  var child = exec(`PATH=${process.env.PATH} next build`, {
    env: { NEXT_PUBLIC_COUNTRY_CODE: country, NEXT_PUBLIC_MOBILE: isMobile ? '1' : '' },
  });
  try {
    await promiseFromChildProcess(child, name);
    unlockWorker();
  } catch (e) {
    unlockWorker();
    // For some reason nextjs build is sometimes failing when executed in parallel
    // with 14 builds happening in parallel ususally 1 or 2 are failing with some silly error like can not import file because it is not found
    if (retry) {
      console.warn('Retrying', name);
      await build(country, isMobile, false);
    } else {
      console.warn('Retrying failed for', name, 'with', e);
      process.exit(1);
    }
  }
}

async function start() {
  console.log('Number of cpus available:', cpuCount);
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
