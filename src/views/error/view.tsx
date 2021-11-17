import { NextPage } from 'next';
import Image from 'next/image';

import { FooterComponent } from 'components/footer/component';
import { HeaderComponent } from 'components/header/component';
import { SavedPropertyContextProvider } from 'components/saved-property/context-provider';
import { WrapperTemplate } from 'components/wrapper/template';
import { useTranslation } from 'helpers/translation/hook';

import styles from './error.module.scss';
import { ErrorViewPropsInterface } from './view-props.interface';

export const ErrorView: NextPage<ErrorViewPropsInterface> = ({ statusCode = 404, error }) => {
  const { t } = useTranslation();

  // TODO-FE[CX-947]: GA context hook should be genaralized and needs to be added when log in btn is clicked
  return (
    <SavedPropertyContextProvider>
      <HeaderComponent languageSelectorVisible={false} />
      <WrapperTemplate className={styles.error__container}>
        <h1 className={styles.error__code}>{statusCode}</h1>
        <p className={styles.error__message}>{error || t('error/page-not-found')}</p>
        <Image
          src='/static/images/oops.png'
          width={100}
          height={100}
          alt='Picture of the page not found'
          aria-labelledby='image-page-not-found'
        />
      </WrapperTemplate>
      <FooterComponent />
    </SavedPropertyContextProvider>
  );
};
