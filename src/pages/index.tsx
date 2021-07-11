import { PageHomeComponent } from 'page/home/component';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }: { locale: string }): Promise<{ props: unknown }> => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default PageHomeComponent;
