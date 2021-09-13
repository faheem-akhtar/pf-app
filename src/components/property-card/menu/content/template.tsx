import { Fragment, MutableRefObject } from 'react';

import { IconThinEyeHideTemplate } from 'components/icon/thin/eye-hide-template';
import { IconThinReportTemplate } from 'components/icon/thin/report-template';
import { IconThinShareTemplate } from 'components/icon/thin/share-template';
import { TFunctionType } from 'types/t-function/type';

import { PropertyCardMenuContentButtonTemplate } from './button/template';

export const PropertyCardMenuContentTemplate = ({
  socialShareOpenRef,
  reportOpenRef,
  t,
}: {
  t: TFunctionType;
  socialShareOpenRef: MutableRefObject<() => void>;
  reportOpenRef: MutableRefObject<() => void>;
}): JSX.Element => {
  return (
    <Fragment>
      <PropertyCardMenuContentButtonTemplate
        label={t('cta-share')}
        icon={IconThinShareTemplate}
        onClick={(): void => {
          socialShareOpenRef.current();
        }}
      />

      <PropertyCardMenuContentButtonTemplate
        label={t('cta-hide')}
        icon={IconThinEyeHideTemplate}
        // TODO[CX-375] - Implement hide property modal
        onClick={(): void => undefined}
      />

      <PropertyCardMenuContentButtonTemplate
        label={t('cta-report')}
        icon={IconThinReportTemplate}
        onClick={(): void => {
          reportOpenRef.current();
        }}
      />
    </Fragment>
  );
};
