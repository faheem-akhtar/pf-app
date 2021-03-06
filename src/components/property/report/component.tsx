import { useContext, useRef, useState } from 'react';

import { apiPropertyReportAttachmentsFetcher } from 'api/property/report/attachments/fetcher';
import { apiPropertyReportFetcher } from 'api/property/report/fetcher';
import { AuthModalComponent } from 'components/auth/modal/component';
import { ModalComponent } from 'components/modal/component';
import { UserContext } from 'components/user/context';
import { functionNoop } from 'helpers/function/noop';
import { GoogleRecaptchaService } from 'services/google/recaptcha.service';

import { PropertyReportComponentPropsInterface } from './component-props.interface';
import { PropertyReportFormSubmitPayloadInterface } from './form/submit-payload.interface';
import { PropertyReportTemplate } from './template';

export const PropertyReportComponent = ({
  openRef,
  propertyId,
  t,
}: PropertyReportComponentPropsInterface): JSX.Element => {
  const captchaService = GoogleRecaptchaService();
  const [isRequestOnProgress, setIsRequestOnProgress] = useState(false);
  const [isReportSent, setIsReportSent] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState('');
  const user = useContext(UserContext);

  const closeRef = useRef<() => void>(functionNoop);

  const closeModal = (): void => {
    closeRef.current();
  };

  const closeReportModal = (): void => {
    setIsReportSent(false);
    setIsRequestOnProgress(false);
    setRequestErrorMessage('');
    closeModal();
  };

  const onClickSubmit = async (payload: PropertyReportFormSubmitPayloadInterface): Promise<void> => {
    setIsRequestOnProgress(true);
    await captchaService.execute();
    setRequestErrorMessage('');
    const { attachment, ...attributes } = payload;

    const requests = [
      (): ReturnType<typeof apiPropertyReportFetcher> =>
        apiPropertyReportFetcher(propertyId, {
          ...attributes,
          email: user?.email || '',
        }),
    ];

    if (attachment) {
      const fileData = new FormData();

      fileData.append('attachment[]', attachment, attachment.name);
      requests.push(() => apiPropertyReportAttachmentsFetcher(propertyId, fileData));
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
    <ModalComponent
      openRef={openRef}
      closeRef={closeRef}
      overlay
      onOverlayClick={!user ? closeModal : closeReportModal}
    >
      {!user ? (
        <AuthModalComponent
          close={closeModal}
          success={(): void => {
            closeModal();
            openRef.current();
          }}
        />
      ) : (
        <PropertyReportTemplate
          isReportSent={isReportSent}
          onSubmit={onClickSubmit}
          isLoading={isRequestOnProgress}
          errorMessage={requestErrorMessage}
          t={t}
          onClose={closeReportModal}
        />
      )}
    </ModalComponent>
  );
};
