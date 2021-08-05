import { IconEmailTemplate } from 'components/icon/email-template';
import { IconSolidPhoneTemplate } from 'components/icon/solid-phone-template';
import { IconWhatsappTemplate } from 'components/icon/whatsapp-template';
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
            labelKey={'Call'}
          />
        )}
        {whatsapp && (
          <PropertyCardCtaButtonsGroupButtonTemplate
            href={whatsapp.link}
            iconComponent={IconWhatsappTemplate}
            onClick={props.onWhatsappClick}
            labelKey={'WhatsApp'}
          />
        )}
        {email && (
          <PropertyCardCtaButtonsGroupButtonTemplate
            href='#'
            iconComponent={IconEmailTemplate}
            onClick={props.onEmailClick}
            labelKey={'Email'}
          />
        )}
      </div>
    );
  };
