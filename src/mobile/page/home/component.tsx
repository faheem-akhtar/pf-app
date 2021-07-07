import {useTranslation} from "next-i18next";
import {LayoutComponent} from "mobile/components/layout/component";
import {PageHomeComponentPropsInterface} from "./component-props.interface";

export const PageHomeComponent = (props: PageHomeComponentPropsInterface) => {
    const { t } = useTranslation('common');

    return (
        <LayoutComponent pageTitle={t(('home_title'))}>
            {t('home_title')}
        </LayoutComponent>
    );
}