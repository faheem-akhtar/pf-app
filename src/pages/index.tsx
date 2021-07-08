import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PageHomeComponent } from 'page/home/component';

export const getStaticProps = async ({ locale }: {locale: string}) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default PageHomeComponent;
