import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LayoutMobileComponent } from '../layout/mobile/component';

const Homepage = () => {
    const { t } = useTranslation('common');

    return (<LayoutMobileComponent pageTitle={t(('index page title'))}>
        {t('index page')}
        </LayoutMobileComponent>);
}

export const getStaticProps = async ({ locale }: {locale: string}) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default Homepage;
