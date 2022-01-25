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

import { FEEDBACK_ANSWER_KEYS_IN_ORDER } from './answer-keys-in-order.constant';
import { FEEDBACK_ANSWERS_NEED_TO_BE_REPORTED } from './answers-need-to-be-reported.constant';
import styles from './calling-agent-modal-feedback.module.scss';
import { CallingAgentModalFeedbackComponentPropsInterface } from './component-props.interface';

const reportAttributes: Omit<ReportAttributesInterface, 'reporter_type'> = {
  email: 'report@report.com',
  message: 'Property Not Available - Call Lead Pop-up',
  reason_id: PropertyReportReasonEnum.notAvailable,
};

export const CallingAgentModalFeedbackComponent: React.FunctionComponent<CallingAgentModalFeedbackComponentPropsInterface> =
  ({ onAnswerClicked, propertyId }) => {
    const filtersCtx = useContext(FiltersContext);
    const user = useContext(UserContext);
    const { t } = useTranslation();

    const onClickAnswer = (option: string) => (): void => {
      if (FEEDBACK_ANSWERS_NEED_TO_BE_REPORTED.includes(option)) {
        apiReportFetcher(propertyId, {
          ...reportAttributes,
          email: user?.email || reportAttributes.email,
          reporter_type: userReportCategory(filtersCtx.value[FiltersParametersEnum.categoryId]),
        });
      }
      onAnswerClicked(option);
    };

    return (
      <React.Fragment>
        <div className={styles.feedback}>
          {FEEDBACK_ANSWER_KEYS_IN_ORDER.map((option, index) => (
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
        <span className={styles.hint}>{t('helping-improvements')}</span>
      </React.Fragment>
    );
  };
