import React, { Fragment, useRef, useState } from 'react';

import { useApiAgent } from 'api/agent/hook';
import { IconThickCrossTemplate } from 'components/icon/thick/cross-template';
import { ModalComponent } from 'components/modal/component';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { functionNoop } from 'helpers/function/noop';
import { useTranslation } from 'helpers/translation/hook';

import styles from './calling-agent-modal.module.scss';
import { CallingAgentModalComponentPropsInterface } from './component-props.interface';
import { CallingAgentModalFeedbackComponent } from './feedback/component';
import { CallingAgentModalInfoComponent } from './info/component';
import { callingAgentModalTracker } from './tracker';

export const CallingAgentModalComponent: React.FunctionComponent<CallingAgentModalComponentPropsInterface> = ({
  property,
  referenceId,
  openRef,
  closeRef,
}) => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { t } = useTranslation();
  const internalCloseRef = useRef<() => void>(closeRef?.current || functionNoop);
  const propertyId = propertySerpObfuscatedGetId(property);
  const agentDetailsResponse = useApiAgent(propertyId, modalIsOpened);

  const closeModal = (): void => {
    setCurrentStep(0);
    setModalIsOpened(false);
    internalCloseRef.current();
  };
  const onCloseClick = (): void => {
    if (currentStep === 1) {
      closeModal();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const isAgentInfoShown = currentStep === 0;

  return (
    <ModalComponent
      openRef={openRef}
      closeRef={internalCloseRef}
      overlay
      onOpen={(): void => {
        setModalIsOpened(true);
      }}
    >
      <div className={styles.content} data-testid='calling-agent-modal-content'>
        <div className={styles['content-header']}>
          <h1 className={styles['content-text']}>
            {t(isAgentInfoShown ? 'agent-modal/title' : 'agent-modal/property-availability')}
          </h1>
          <button onClick={onCloseClick}>
            <IconThickCrossTemplate class={styles['content-close-icon']} />
          </button>
        </div>
        {agentDetailsResponse.ok && (
          <Fragment>
            {isAgentInfoShown ? (
              <CallingAgentModalInfoComponent
                avatar={agentDetailsResponse.data.imageSrc}
                name={agentDetailsResponse.data.name}
                languages={agentDetailsResponse.data.languages}
                referenceId={referenceId}
              />
            ) : (
              <CallingAgentModalFeedbackComponent
                propertyId={propertyId}
                onAnswerClicked={(answer): void => {
                  callingAgentModalTracker.onAnswerClicked(property, answer);
                  closeModal();
                }}
              />
            )}
          </Fragment>
        )}
      </div>
    </ModalComponent>
  );
};
