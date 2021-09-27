import { useRouter } from 'next/router';
import { useContext } from 'react';

import { FiltersContext } from 'components/filters/context';
import { IconThickChevronRightTemplate } from 'components/icon/thick/chevron-right-template';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { categoryIdIsSale } from 'helpers/category-id/is-sale';
import { useTranslation } from 'helpers/translation/hook';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import { mortgageFinderGetUrl } from '../finder/get-url';
import { MortgageCampaignComponentPropsInterface } from './component-props.interface';
import { mortgageCampaignGetButtonUrl } from './get-button-url';
import styles from './mortgage-campaign.module.scss';

export const MortgageCampaignComponent = ({
  property,
  leadModel,
}: MortgageCampaignComponentPropsInterface): JSX.Element | null => {
  const { t } = useTranslation();
  const locale = useRouter().locale as string;
  const filtersCtx = useContext(FiltersContext);

  if (!categoryIdIsSale(filtersCtx.value[FiltersParametersEnum.categoryId])) {
    return null;
  }

  const buttonUrl = mortgageCampaignGetButtonUrl(
    filtersCtx.value[FiltersParametersEnum.categoryId],
    mortgageFinderGetUrl(locale),
    property,
    leadModel
  );

  return (
    <section className={styles.container}>
      <p>{t('agent-modal/mortgage-campaign-title')}</p>
      <ButtonTemplate
        href={buttonUrl}
        target='_blank'
        rel='noreferrer'
        type='button'
        size={ButtonSizeEnum.regular}
        componentType={ButtonComponentTypeEnum.primary}
        icon={{ component: IconThickChevronRightTemplate, position: ButtonIconPositionEnum.right }}
        fullWidth
        className={styles.button}
      >
        {t('agent-modal/mortgage-campaign-cta-label')}
      </ButtonTemplate>
    </section>
  );
};
