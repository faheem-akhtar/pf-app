import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Homepage = () => {
    const { t } = useTranslation('common');

    return (<>
        {t('index page')}
    </>);
}

export const getStaticProps = async ({ locale }: {locale: string}) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default Homepage;
