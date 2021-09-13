import React, { useContext } from 'react';

import { apiReportFetcher } from 'api/report/fetcher';
import { FiltersContext } from 'components/filters/context';
import { UserContext } from 'context/user/context';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { PropertyReportReasonEnum } from 'enums/property/report/reason.enum';
import { useTranslation } from 'helpers/translation/hook';
import { userReportCategory } from 'helpers/user/report-category';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { ReportAttributesInterface } from 'types/report/attributes-interface';

import styles from './calling-agent-modal.module.scss';

const FeedbackAnswerKeysInOrder = ['yes', 'no', 'agent-modal/agent-not-answered', 'agent-modal/not-called'];
const AnswersNeedToBeReported = ['no'];

const reportAttributes: Omit<ReportAttributesInterface, 'reporter_type'> = {
  email: 'report@report.com',
  message: 'Property Not Available - Call Lead Pop-up',
  reason_id: PropertyReportReasonEnum.notAvailable,
};

export const CallingAgentModalFeedbackComponent: React.FunctionComponent<{
  propertyId: string;
  onAnswerClicked: () => void;
}> = ({ onAnswerClicked, propertyId }) => {
  const filtersCtx = useContext(FiltersContext);
  const user = useContext(UserContext);
  const { t } = useTranslation();

  const onClickAnswer = (option: string) => (): void => {
    if (AnswersNeedToBeReported.includes(option)) {
      apiReportFetcher(propertyId, {
        // TODO-FE[CX-180] implement Datadog logging
        ...reportAttributes,
        email: user?.email || reportAttributes.email,
        reporter_type: userReportCategory(filtersCtx.value[FiltersParametersEnum.categoryId]),
      });
    }
    onAnswerClicked();
  };

  return (
    <React.Fragment>
      <div className={styles.feedbackContainer}>
        {FeedbackAnswerKeysInOrder.map((option, index) => (
          <ButtonTemplate
            key={`feedback-${index}`}
            className={styles.option}
            type='button'
            componentType={ButtonComponentTypeEnum.secondary}
            size={ButtonSizeEnum.regular}
            onClick={onClickAnswer(option)}
          >
            {t(option)}
          </ButtonTemplate>
        ))}
      </div>
      <span className={styles.feedbackHint}>{t('helping-improvements')}</span>
    </React.Fragment>
  );
};
