import { AuthFacebookService } from 'services/auth/facebook.service';
import { AuthGoogleService } from 'services/auth/google.service';
import { AuthLoginComponent } from 'components/auth/login/component';
import { domClassMerge } from 'helpers/dom/class-merge';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { IconFacebookTemplate } from 'components/icon/facebook-template';
import { IconGoogleTemplate } from 'components/icon/google-template';
import { IconThinFilterOpenTemplate } from 'components/icon/thin/filter-open-template';

import styles from './auth-modal-component.module.scss';

// TODO-FE[CX-218] - Update template
export const AuthModalComponent = ({ close }: { close: () => void }): JSX.Element => {
  return (
    <div className='authentication'>
      <ButtonTemplate
        type='button'
        componentType={ButtonComponentTypeEnum.tertiary}
        size={ButtonSizeEnum.small}
        onClick={close}
        icon={{ component: IconThinFilterOpenTemplate, position: ButtonIconPositionEnum.left }}
      >
        {'close'}
      </ButtonTemplate>
      <div className='authentication__content'>
        <ButtonTemplate
          type='button'
          className={domClassMerge(styles.authModal__btn, styles.authModal__btnFacebook)}
          componentType={ButtonComponentTypeEnum.tertiary}
          size={ButtonSizeEnum.small}
          onClick={(): void => {
            AuthFacebookService.signIn()
              .then(close)
              .catch((error) => {
                // TODO-FE[CX-222] - Add validation
                close();
                // eslint-disable-next-line no-console
                console.error(error);
              });
          }}
          icon={{ component: IconFacebookTemplate, position: ButtonIconPositionEnum.left }}
        >
          {'Sign in with Facebook'}
        </ButtonTemplate>
        <ButtonTemplate
          type='button'
          className={domClassMerge(styles.authModal__btn, styles.authModal__btnFacebook)}
          componentType={ButtonComponentTypeEnum.tertiary}
          size={ButtonSizeEnum.small}
          onClick={(): void => {
            AuthGoogleService.signIn()
              .then(close)
              .catch((error) => {
                // TODO-FE[CX-222] - Add validation
                close();
                // eslint-disable-next-line no-console
                console.error(error);
              });
          }}
          icon={{ component: IconGoogleTemplate, position: ButtonIconPositionEnum.left }}
        >
          {'Sign in with Google'}
        </ButtonTemplate>
        <div className='authentication__divider'>
          <span className='authentication__divider-txt'>{'or'}</span>
        </div>
        <AuthLoginComponent close={close} />
      </div>
      <div className='authentication__footer' />
    </div>
  );
};
