import React, { useRef, useState } from 'react';

import { functionNoop } from 'helpers/function/noop';

import { CallingAgentModalComponentPropsInterface } from './component-props.interface';
import { CallingAgentModalFeedbackComponent } from './feedback-component';

import { IconThickCrossTemplate } from 'components/icon/thick/cross-template';
import { ModalComponent } from 'components/modal/component';
import styles from './calling-agent-modal.module.scss';

import { domClassMerge } from 'helpers/dom/class-merge';
import { useApiAgent } from 'api/agent/hook';
import { useTranslationHook } from 'helpers/hook/translation.hook';

import { PropertyAgentResultType } from 'components/property/agent-result.type';

const AgentInfoComponent: React.FunctionComponent<{
  name?: string;
  referenceId: string;
  avatar?: string;
  languages?: string[];
}> = ({ referenceId, avatar, languages, name }) => {
  const { t } = useTranslationHook();

  return (
    <div className={styles.details}>
      <div className={styles.avatarContainer}>
        <picture className={styles.avatar}>
          <source srcSet={avatar} type='image/jpeg' />
          <img className={styles.avatar} src={avatar} />
        </picture>
      </div>
      <div className={styles.info}>
        <span className={domClassMerge(styles.name, styles.text)}>{name}</span>
        <p className={styles.description}>
          {t('speaks')} {languages?.length ? languages.join(', ') : null}
          <br />
          {t('reference')}: <span className={styles.text}>{referenceId}</span>
        </p>
      </div>
    </div>
  );
};

// TODO-FE[CX-431] Add unit tests for CallingAgentModalComponent
export const CallingAgentModalComponent: React.FunctionComponent<CallingAgentModalComponentPropsInterface> = ({
  propertyId,
  referenceId,
  openRef,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [agentDetail, setAgentDetail] = useState<PropertyAgentResultType>();
  const { t } = useTranslationHook();
  const closeRef = useRef<() => void>(functionNoop);
  const agentDetailsResponse = useApiAgent(propertyId, isOpened);

  if (!agentDetail && agentDetailsResponse.ok) {
    setAgentDetail(agentDetailsResponse.data);
  }

  const closeModal = (): void => {
    setCurrentStep(0);
    closeRef.current();
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
      closeRef={closeRef}
      overlay
      onOpen={(): void => {
        setIsOpened(true);
      }}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.text}>
            {t(isAgentInfoShown ? 'agent-modal/title' : 'agent-modal/property-availability')}
          </span>
          <div onClick={onCloseClick}>
            <IconThickCrossTemplate class={styles.closeIcon} />
          </div>
        </div>
        {isAgentInfoShown ? (
          <AgentInfoComponent
            avatar={agentDetail?.imageSrc}
            name={agentDetail?.name}
            languages={agentDetail?.languages}
            referenceId={referenceId}
          />
        ) : (
          <CallingAgentModalFeedbackComponent propertyId={propertyId} onAnswerClicked={closeModal} />
        )}
      </div>
    </ModalComponent>
  );
};
