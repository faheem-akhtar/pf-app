import { Fragment } from 'react';

import { IconThinEyeHideTemplate } from 'components/icon/thin/eye-hide-template';
import { IconThinReportTemplate } from 'components/icon/thin/report-template';
import { IconThinShareTemplate } from 'components/icon/thin/share-template';
import { PropertyCardMenuContentButtonTemplate } from './button/template';
import { TFunctionType } from 'types/t-function/type';

export const PropertyCardMenuContentTemplate = ({ t }: { t: TFunctionType }): JSX.Element => {
  return (
    <Fragment>
      <PropertyCardMenuContentButtonTemplate
        label={t('cta-share')}
        icon={IconThinShareTemplate}
        // TODO[CX-370] - Implement share property modal
        onClick={(): void => undefined}
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
        // TODO[CX-371] - Implement report property modal
        onClick={(): void => undefined}
      />
    </Fragment>
  );
};
