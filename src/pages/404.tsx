/* eslint-disable @propertyfinder/rules/export-name-validation */
import { GetStaticProps } from 'next';

import { backendTranslationGetDefinitions } from 'backend/translation/get-definitions';
import { ErrorView } from 'views/error/view';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await backendTranslationGetDefinitions(locale as string)),
      statusCode: 404,
    },
  };
};

export default ErrorView;
