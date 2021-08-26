import { useContext } from 'react';

import { UserContext } from 'context/user/context';

import { IconSolidEnvelopeOpenTemplate } from 'components/icon/solid/envelope-open-template';
import { IconSolidFavoriteTemplate } from 'components/icon/solid/favorite-template';
import { IconThinSyncTemplate } from 'components/icon/thin/sync-template';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { EmailAgentModalSignInItemTemplate } from './item-template';
import { EmailAgentModalSignInTemplatePropsInterface } from './template-props.interface';

import styles from './email-agent-modal-sign-in.module.scss';

export const EmailAgentModalSignInTemplate = ({
  t,
  onClickNotNow,
  onClickSignIn,
}: EmailAgentModalSignInTemplatePropsInterface): JSX.Element | null => {
  const user = useContext(UserContext);

  if (user) return null;

  return (
    <div className={styles.container}>
      <p className={styles.title}>{t('agent-modal/sign-in-title')}</p>

      <ul className={styles.list}>
        <EmailAgentModalSignInItemTemplate icon={<IconSolidFavoriteTemplate class={styles.icon} clipped />}>
          {t('agent-modal/sign-in/saved-properties-label')}
        </EmailAgentModalSignInItemTemplate>

        <EmailAgentModalSignInItemTemplate icon={<IconSolidEnvelopeOpenTemplate class={styles.icon} />}>
          {t('agent-modal/sign-in/agent-communication-label')}
        </EmailAgentModalSignInItemTemplate>

        <EmailAgentModalSignInItemTemplate icon={<IconThinSyncTemplate class={styles.icon} />}>
          {t('agent-modal/sign-in/sync-all-devices-label')}
        </EmailAgentModalSignInItemTemplate>
      </ul>

      <ButtonTemplate
        type='button'
        size={ButtonSizeEnum.regular}
        componentType={ButtonComponentTypeEnum.primary}
        onClick={onClickSignIn}
        fullWidth
      >
        {t('sign-in')}
      </ButtonTemplate>

      <button className={styles.notNowButton} onClick={onClickNotNow}>
        {t('not-now')}
      </button>
    </div>
  );
};
