import { NextPage } from 'next';
import Image from 'next/image';

import { FooterComponent } from 'components/footer/component';
import { HeadComponent } from 'components/head/component';
import { HeaderComponent } from 'components/header/component';
import { SavedPropertyContextProvider } from 'components/saved-property/context-provider';
import { WrapperTemplate } from 'components/wrapper/template';
import { useTranslation } from 'helpers/translation/hook';

import styles from './error.module.scss';
import { ErrorViewPropsInterface } from './view-props.interface';

export const ErrorView: NextPage<ErrorViewPropsInterface> = ({ statusCode = 404, error }) => {
  const { t } = useTranslation();
  const title = t('error/page-not-found');

  // TODO-FE[CX-947]: GA context hook should be genaralized and needs to be added when log in btn is clicked
  return (
    <SavedPropertyContextProvider>
      <HeadComponent title={title} shouldIndex={false} />
      <HeaderComponent languageSelectorVisible={false} />
      <WrapperTemplate className={styles.error__container}>
        <h1 className={styles.error__code}>{statusCode}</h1>
        <p className={styles.error__message}>{error || title}</p>
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
