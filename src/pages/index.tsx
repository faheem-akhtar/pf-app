/* eslint-disable pf-rules/export-name-validation */
import { HomeView } from 'views/home/view';
import { translationGetDefinitions } from 'helpers/translation/get-definitions';

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: unknown }> => {
  return {
    props: { ...(await translationGetDefinitions(locale)) },
  };
};

export default HomeView;
