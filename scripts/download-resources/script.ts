global.fetch = require('node-fetch');

import { writeFileSync } from 'fs';

import { backendApiFormSettingsFetcher } from 'backend/api/form-settings/fetcher';
import { backendApiLocationAllFetcher } from 'backend/api/location/all-fetcher';

import { configCommon as aeConfig } from 'config/common';
import { configOriginValue as aeOrigin } from 'config/origin/value';
import { configCommon as bhConfig } from 'config/common.bh';
import { configOriginValue as bhOrigin } from 'config/origin/value.bh';
import { configCommon as egConfig } from 'config/common.eg';
import { configOriginValue as egOrigin } from 'config/origin/value.eg';
import { configCommon as lbConfig } from 'config/common.lb';
import { configOriginValue as lbOrigin } from 'config/origin/value.lb';
import { configCommon as maConfig } from 'config/common.ma';
import { configOriginValue as maOrigin } from 'config/origin/value.ma';
import { configCommon as qaConfig } from 'config/common.qa';
import { configOriginValue as qaOrigin } from 'config/origin/value.qa';
import { configCommon as saConfig } from 'config/common.sa';
import { configOriginValue as saOrigin } from 'config/origin/value.sa';

import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiRequestPropsType } from 'api/request-props.type';
import { backendApiLocationSlugHistoryFetcher } from 'backend/api/location/slug-history/fetcher';
import { backendTranslationGetDefinitions } from 'backend/translation/get-definitions';
import { ConfigCommonInterface } from 'config/common.interface';

let translations: Record<string, Record<string, Record<string, string>>>;

const configByCountry: Record<string, ConfigCommonInterface> = {
  ae: aeConfig,
  bh: bhConfig,
  eg: egConfig,
  lb: lbConfig,
  ma: maConfig,
  qa: qaConfig,
  sa: saConfig,
};

const originByCountry: Record<string, string> = {
  ae: aeOrigin,
  bh: bhOrigin,
  eg: egOrigin,
  lb: lbOrigin,
  ma: maOrigin,
  qa: qaOrigin,
  sa: saOrigin,
};

const makeDownloader = <QueryData, Result>(
  fetcher: (params: {
    translations?: Record<string, Record<string, string>>;
    isPrimaryLocale?: boolean;
  }) => (props: ApiRequestPropsType<QueryData>) => Promise<ApiFetcherResultType<Result>>,
  name: string
) =>
  async function (country: string) {
    const {
      language: { current: mainLang, alternative: altLang },
    } = configByCountry[country];

    const origin = originByCountry[country];
    const [main, alt] = await Promise.all(
      // TODO[CX-1075] - avoid passing the locale twice
      [mainLang, altLang].map((locale) =>
        fetcher({
          translations: translations[locale],
          isPrimaryLocale: locale === mainLang,
        })({
          locale,
          getOrigin: () => `http://${origin}`,
          alterHeaders: (headers) => {
            delete headers['Host'];
          },
        })
      )
    );

    console.log(`downloading ${name} from ${origin}`);
    if (main.ok && alt.ok) {
      const countryExtension = country === 'ae' ? '' : `.${country}`;

      const filePath = `${__dirname}/../../public/static/${name}/index${countryExtension}.ts`;
      const data = JSON.stringify({
        [mainLang]: main.data,
        [altLang]: alt.data,
      });

      writeFileSync(filePath, `export default ${data};`);
    } else {
      if (!main.ok) console.error(main.error);
      if (!alt.ok) console.error(alt.error);
      throw new Error('Failed to download locations');
    }
  };

const downloadLocations = makeDownloader(backendApiLocationAllFetcher, 'locations');
const downloadFiltersData = makeDownloader(backendApiFormSettingsFetcher, 'filters-data');
const downloadLocationSlugHistory = makeDownloader(backendApiLocationSlugHistoryFetcher, 'locations-slug-history');

async function downloadResources() {
  // filters data need translations so first we need to get those
  const translationEn = await backendTranslationGetDefinitions('en');
  const translationAr = await backendTranslationGetDefinitions('ar');

  translations = {
    en: translationEn._nextI18Next?.initialI18nStore['en'],
    ar: translationAr._nextI18Next?.initialI18nStore['ar'],
  };

  const downloadForCountry = (country: string) => [
    downloadLocations(country),
    downloadFiltersData(country),
    downloadLocationSlugHistory(country),
  ];
  await Promise.all([
    ...downloadForCountry('ae'),
    ...downloadForCountry('bh'),
    ...downloadForCountry('eg'),
    ...downloadForCountry('lb'),
    ...downloadForCountry('ma'),
    ...downloadForCountry('qa'),
    ...downloadForCountry('sa'),
  ]);
}

downloadResources();
