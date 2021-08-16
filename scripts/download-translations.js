#!/usr/bin/env node

global.fetch = require('node-fetch');
const { LokaliseApi } = require('@lokalise/node-api');
const path = require('path');
const { createWriteStream, unlinkSync } = require('fs');
const extractZip = require('extract-zip');
const countries = require('./countries');

const LOKALISE_PROJECT_ID = '8608849260eedebb9ba8d9.28758700';
const LOKALISE_API_TOKEN = 'c1446520f1c1dd161bbbb8e28768fb28c444ae6c';

const lokaliseApi = new LokaliseApi({ apiKey: LOKALISE_API_TOKEN });

const staticFolder = path.resolve(process.cwd(), 'public/static');
const translationsPath = path.resolve(staticFolder, 'translations');

const fetchTranslations = async (url, filename) => {
  const response = await fetch(url);
  const downloadedFilePath = `${staticFolder}/${filename}.zip`;
  const fileStream = createWriteStream(downloadedFilePath);

  return new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    fileStream.on('finish', () => {
      console.info(`Lokalise bundle for ${filename} is downloaded`);
      resolve(downloadedFilePath);
    });
    response.body.on('error', (err) => {
      console.error('Downloading bundle has failed. Reason: ', err);
      reject(err);
    });
  });
};

const extractFiles = (filePath) => extractZip(filePath, { dir: translationsPath });

const getBundleUrlForCommonTranslations = async () => {
  const { bundle_url } = await lokaliseApi.files.download(LOKALISE_PROJECT_ID, {
    format: 'json',
    export_sort: 'first_added',
    filter_filenames: ['common/%LANG_ISO%.json'],
    bundle_structure: '%LANG_ISO%/common.json',
    original_filenames: false,
    export_empty_as: 'skip',
  });
  console.info(`Lokalise bundle url for common translations is ready to download`);
  return bundle_url;
};

const getBundleUrlForCountrySpecificTranslations = async (countryCode) => {
  try {
    const { bundle_url } = await lokaliseApi.files.download(LOKALISE_PROJECT_ID, {
      format: 'json',
      export_empty_as: 'skip',
      original_filenames: false,
      filter_filenames: [`country/${countryCode}/%LANG_ISO%.json`],
      bundle_structure: `%LANG_ISO%/${countryCode}.json`,
    });
    console.info(`Lokalise bundle url for ${countryCode} is ready to download`);
    return bundle_url;
  } catch (err) {
    console.error(`Lokalise bundle url for ${countryCode} is not ready. Reason: `, err);
    if (err.code === 406) {
      // it means country/${coode}/%LANG_ISO%.json is not exist
      return null;
    }
    throw err;
  }
};

const downloadTranslations = async () => {
  const commonTranslationUrl = await getBundleUrlForCommonTranslations();
  const commonDownloadedFile = await fetchTranslations(commonTranslationUrl, 'common');
  await extractFiles(commonDownloadedFile);
  unlinkSync(commonDownloadedFile);
  console.info('Zip file for common translations is deleted');
  return async (countryCode) => {
    const countryTranslationUrl = await getBundleUrlForCountrySpecificTranslations(countryCode);
    if (countryTranslationUrl) {
      const countryDownloadedFile = await fetchTranslations(countryTranslationUrl, countryCode);
      await extractFiles(countryDownloadedFile);
      unlinkSync(countryDownloadedFile);
      console.info(`Zip file for ${countryCode} is deleted`);
    }
  };
};

(async (countryCodes) => {
  console.info('Started downloading translations');
  const downloadTranslationForEachCountry = await downloadTranslations();
  await Promise.all(countryCodes.map((code) => downloadTranslationForEachCountry(code)));
  console.info('Finished downloading translations');
})(countries);
