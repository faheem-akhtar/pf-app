import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }: {locale: string}) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default (
    process.env.NEXT_PUBLIC_MOBILE ?
        require("mobile/page/home/component") :
        require("desktop/page/home/component")
).PageHomeComponent;
