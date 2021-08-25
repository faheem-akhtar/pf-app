import React, { useContext } from 'react';
import { useTranslation } from 'helpers/translation/hook';

import { apiReportFetcher } from 'api/report/fetcher';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { CountryCodeEnum } from 'enums/country/code.enum';
import { FiltersContext } from 'components/filters/context';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { ReportAttributesInterface } from 'types/report/attributes-interface';
import { UserContext } from 'context/user/context';

import styles from './calling-agent-modal.module.scss';
import { userReportCategory } from 'helpers/user/report-category';

const FeedbackAnswerKeysInOrder = ['yes', 'no', 'agent-modal/agent-not-answered', 'agent-modal/not-called'];
const AnswersNeedToBeReported = ['no'];

const reportAttributes: Omit<ReportAttributesInterface, 'reporter_type'> = {
  email: 'report@report.com',
  message: 'Property Not Available - Call Lead Pop-up',
  reason_id: 1,
};

const isCountryAE = process.env.NEXT_PUBLIC_COUNTRY_CODE === CountryCodeEnum.ae;

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
        ...reportAttributes,
        email: user?.email || reportAttributes.email,
        reporter_type: isCountryAE ? userReportCategory(filtersCtx.value[FiltersParametersEnum.categoryId]) : '',
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
