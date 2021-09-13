import { Fragment, MutableRefObject, useContext, useRef, useState } from 'react';
import { apiReportAttachmentsFetcher } from 'api/report/attachments/fetcher';
import { apiReportFetcher } from 'api/report/fetcher';
import { functionNoop } from 'helpers/function/noop';

import { AuthModalComponent } from 'components/auth/modal/component';
import { GoogleRecaptchaService } from 'services/google/recaptcha.service';
import { IconSolidWarningTemplate } from 'components/icon/solid/warning-template';
import { IconThickCloseTemplate } from 'components/icon/thick/close-template';
import { IconThinCheckmarkCircleTemplate } from 'components/icon/thin/checkmark-circle-template';
import { ModalComponent } from 'components/modal/component';
import { PropertyReportFormComponent } from './form/component';
import { PropertyReportFormSubmitPayloadInterface } from './form/submit-payload.interface';
import { TFunctionType } from 'types/t-function/type';
import { UserContext } from 'context/user/context';

import styles from './property-report.module.scss';

const captchaService = GoogleRecaptchaService();

export const PropertyReportComponent = ({
  openRef,
  propertyId,
  t,
}: {
  openRef: MutableRefObject<() => void>;
  propertyId: string;
  t: TFunctionType;
}): JSX.Element => {
  const [isRequestOnProgress, setIsRequestOnProgress] = useState(false);
  const [isReportSent, setIsReportSent] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState('');
  const closeRef = useRef<() => void>(functionNoop);
  const authCoseRef = useRef<() => void>(functionNoop);
  const user = useContext(UserContext);

  const closeModal = (): void => {
    setIsReportSent(false);
    setIsRequestOnProgress(false);
    setRequestErrorMessage('');
    closeRef.current();
  };

  if (!user) {
    return (
      <ModalComponent openRef={openRef} closeRef={authCoseRef} overlay>
        <AuthModalComponent
          close={(): void => {
            authCoseRef.current();
          }}
        />
      </ModalComponent>
    );
  }

  const onClickSubmit = async (payload: PropertyReportFormSubmitPayloadInterface): Promise<void> => {
    setIsRequestOnProgress(true);
    captchaService.execute();
    setRequestErrorMessage('');
    const { attachment, ...attributes } = payload;
    const requests = [
      (): ReturnType<typeof apiReportFetcher> =>
        apiReportFetcher(propertyId, {
          ...attributes,
          email: user?.email,
        }),
    ];

    if (attachment) {
      const fileData = new FormData();

      fileData.append('attachment[]', attachment, attachment.name);
      requests.push(() => apiReportAttachmentsFetcher(propertyId, fileData));
    }

    Promise.all(requests.map((request) => request())).then((responses) => {
      setIsRequestOnProgress(false);
      if (responses.every((response) => response.ok)) {
        setIsReportSent(true);
      } else {
        setRequestErrorMessage(t('something-wrong-try-again'));
        captchaService.reset();
      }
    });
  };

  return (
    <ModalComponent openRef={openRef} closeRef={closeRef} overlay>
      <div
        className={styles.container}
        onClick={(e): void => {
          e.stopPropagation();
        }}
      >
        <div className={styles.header}>
          <div className={styles.close} onClick={closeModal}>
            <IconThickCloseTemplate class={styles.closeIcon} />
          </div>
          {!isReportSent && (
            <Fragment>
              <IconSolidWarningTemplate class={styles.icon} />
              <span>{t('report-modal/title')}</span>
            </Fragment>
          )}
        </div>
        {!isReportSent ? (
          <PropertyReportFormComponent
            errorMessage={requestErrorMessage}
            loading={isRequestOnProgress}
            onClickSubmit={onClickSubmit}
            t={t}
          />
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
    </ModalComponent>
  );
};
