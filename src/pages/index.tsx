/* eslint-disable pf-rules/export-name-validation */
import { HomeView } from 'views/home/view';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: unknown }> => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default HomeView;
