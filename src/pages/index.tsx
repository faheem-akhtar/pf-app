/* eslint-disable @propertyfinder/rules/export-name-validation */
import { GetStaticProps } from 'next';

import { backendTranslationGetDefinitions } from 'backend/translation/get-definitions';
import { HomeView } from 'views/home/view';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: { ...(await backendTranslationGetDefinitions(locale as string)) },
  };
};

export default HomeView;
