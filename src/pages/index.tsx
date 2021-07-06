import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LayoutComponent } from '../mobile/layout/component';

const Homepage = () => {
    const { t } = useTranslation('common');

    return (
        <LayoutComponent pageTitle={t(('index page title'))}>
            {t('index page')}
        </LayoutComponent>
    );
}

export const getStaticProps = async ({ locale }: {locale: string}) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default Homepage;
