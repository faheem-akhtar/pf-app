import React, { Fragment, useRef, useState } from 'react';

import { useApiAgent } from 'api/agent/hook';
import { IconThickCrossTemplate } from 'components/icon/thick/cross-template';
import { ModalComponent } from 'components/modal/component';
import { domClassMerge } from 'helpers/dom/class-merge';
import { functionNoop } from 'helpers/function/noop';
import { useTranslation } from 'helpers/translation/hook';

import styles from './calling-agent-modal.module.scss';
import { CallingAgentModalComponentPropsInterface } from './component-props.interface';
import { CallingAgentModalFeedbackComponent } from './feedback-component';

const AgentInfoComponent: React.FunctionComponent<{
  name?: string;
  referenceId: string;
  avatar?: string;
  languages?: string[];
}> = ({ referenceId, avatar, languages, name }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.details} data-testid='agent-info-component-details'>
      <div className={styles.avatarContainer}>
        <picture className={styles.avatar}>
          <source srcSet={avatar} type='image/jpeg' />
          <img className={styles.avatar} src={avatar} />
        </picture>
      </div>
      <div className={styles.info}>
        <span className={domClassMerge(styles.name, styles.text)}>{name}</span>
        <p className={styles.description}>
          {languages?.length ? (
            <Fragment>
              {`${t('speaks')}: ${languages.join(', ')}`}
              <br />
            </Fragment>
          ) : null}
          {t('reference')}: <span className={styles.text}>{referenceId}</span>
        </p>
      </div>
    </div>
  );
};

export const CallingAgentModalComponent: React.FunctionComponent<CallingAgentModalComponentPropsInterface> = ({
  propertyId,
  referenceId,
  openRef,
  closeRef,
}) => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { t } = useTranslation();
  const internalCloseRef = useRef<() => void>(closeRef?.current || functionNoop);
  const agentDetailsResponse = useApiAgent(propertyId, modalIsOpened);

  const closeModal = (): void => {
    setCurrentStep(0);
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
        <div className={styles.header}>
          <h1 className={styles.text}>
            {t(isAgentInfoShown ? 'agent-modal/title' : 'agent-modal/property-availability')}
          </h1>
          <button onClick={onCloseClick}>
            <IconThickCrossTemplate class={styles.closeIcon} />
          </button>
        </div>
        {agentDetailsResponse.ok && (
          <Fragment>
            {isAgentInfoShown ? (
              <AgentInfoComponent
                avatar={agentDetailsResponse.data.imageSrc}
                name={agentDetailsResponse.data.name}
                languages={agentDetailsResponse.data.languages}
                referenceId={referenceId}
              />
            ) : (
              <CallingAgentModalFeedbackComponent propertyId={propertyId} onAnswerClicked={closeModal} />
            )}
          </Fragment>
        )}
      </div>
    </ModalComponent>
  );
};
