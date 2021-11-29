import { Fragment } from 'react';

import { IconThinReportTemplate } from 'components/icon/thin/report-template';
import { IconThinShareTemplate } from 'components/icon/thin/share-template';

import { PropertyCardMenuContentButtonTemplate } from './button/template';
import { PropertyCardMenuContentTemplatePropsInterface } from './template-props.interface';

export const PropertyCardMenuContentTemplate = ({
  socialShareOpenRef,
  reportOpenRef,
  t,
}: PropertyCardMenuContentTemplatePropsInterface): JSX.Element => {
  return (
    <Fragment>
      <PropertyCardMenuContentButtonTemplate
        label={t('cta-share')}
        icon={IconThinShareTemplate}
        onClick={(): void => {
          socialShareOpenRef.current();
        }}
      />

      {/* TODO[CX-375] - Implement hide property modal
      <PropertyCardMenuContentButtonTemplate
        label={t('cta-hide')}
        icon={IconThinEyeHideTemplate}
        onClick={(): void => undefined}
      /> */}

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
