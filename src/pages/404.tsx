/* eslint-disable pf-rules/export-name-validation */

import { backendTranslationGetDefinitions } from 'backend/translation/get-definitions';
import { ErrorView } from 'views/error/view';

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: unknown }> => {
  return {
    props: { ...(await backendTranslationGetDefinitions(locale)), statusCode: 404 },
  };
};

export default ErrorView;
