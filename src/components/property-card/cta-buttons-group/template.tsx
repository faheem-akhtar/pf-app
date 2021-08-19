import { IconSolidEmailTemplate } from 'components/icon/solid/email-template';
import { IconSolidPhoneTemplate } from 'components/icon/solid/phone-template';
import { IconSolidWhatsappTemplate } from 'components/icon/solid/whatsapp-template';
import { PropertyCardCtaButtonsGroupButtonTemplate } from './button/template';
import { PropertyCardCtaButtonsGroupTemplatePropsInterface } from './template-props.interface';

import styles from './property-cta-buttons.module.scss';

export const PropertyCardCtaButtonsGroupTemplate: React.FunctionComponent<PropertyCardCtaButtonsGroupTemplatePropsInterface> =
  (props) => {
    const { contactOptions } = props;
    const { phone, whatsapp, email } = contactOptions;

    return (
      <div className={styles.container}>
        {phone && (
          <PropertyCardCtaButtonsGroupButtonTemplate
            href={phone.link}
            iconComponent={IconSolidPhoneTemplate}
            onClick={props.onCallClick}
            label={props.t('cta-call')}
          />
        )}
        {whatsapp && (
          <PropertyCardCtaButtonsGroupButtonTemplate
            href={whatsapp.link}
            iconComponent={IconSolidWhatsappTemplate}
            onClick={props.onWhatsappClick}
            label={props.t('cta-whatsapp')}
          />
        )}
        {email && (
          <PropertyCardCtaButtonsGroupButtonTemplate
            href='#'
            iconComponent={IconSolidEmailTemplate}
            onClick={props.onEmailClick}
            label={props.t('cta-email')}
          />
        )}
      </div>
    );
  };
