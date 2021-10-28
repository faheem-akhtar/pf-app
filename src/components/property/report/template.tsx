import { IconSolidWarningTemplate } from 'components/icon/solid/warning-template';
import { IconThickCloseTemplate } from 'components/icon/thick/close-template';
import { IconThinCheckmarkCircleTemplate } from 'components/icon/thin/checkmark-circle-template';
import { TFunctionType } from 'types/t-function/type';

import { PropertyReportFormComponent } from './form/component';
import { PropertyReportFormSubmitPayloadInterface } from './form/submit-payload.interface';
import styles from './property-report.module.scss';

export const PropertyReportTemplate = ({
  isReportSent,
  onClose,
  onSubmit,
  errorMessage,
  isLoading,
  t,
}: {
  isReportSent: boolean;
  isLoading: boolean;
  errorMessage: string;
  onClose: () => void;
  onSubmit: (payload: PropertyReportFormSubmitPayloadInterface) => Promise<void>;
  t: TFunctionType;
}): JSX.Element => (
  <div
    data-testid='property-report'
    className={styles.container}
    onClick={(e): void => {
      e.stopPropagation();
    }}
  >
    <div className={styles.header}>
      <button className={styles.close} onClick={onClose}>
        <IconThickCloseTemplate class={styles.closeIcon} />
      </button>
      {!isReportSent && (
        <>
          <IconSolidWarningTemplate class={styles.icon} />
          <span>{t('report-modal/title')}</span>
        </>
      )}
    </div>
    {!isReportSent ? (
      <PropertyReportFormComponent errorMessage={errorMessage} loading={isLoading} onClickSubmit={onSubmit} t={t} />
    ) : (
      <div className={styles.success}>
        <IconThinCheckmarkCircleTemplate class={styles['success__icon']} />
        <div className={styles['success__content']}>
          <p>{t('thank-you')}</p>
          <p>{t('report-modal/report-is-sent')}</p>
        </div>
      </div>
    )}
  </div>
);
