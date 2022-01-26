import { UserInterface } from 'components/user/interface';
import { AnalyticsTealiumService } from 'services/analytics/tealium.service';

export const tealiumUserEventTracker = {
  onLoginWithFacebook: (user: UserInterface): void => {
    AnalyticsTealiumService().onUserLoggedIn(
      {
        user_email: user.email,
        user_id: user.userId,
        user_status: 'Logged In',
      },
      'facebook'
    );
  },
  onLoginWithEmail: (user: UserInterface): void => {
    AnalyticsTealiumService().onUserLoggedIn(
      {
        user_email: user.email,
        user_id: user.userId,
        user_status: 'Logged In',
      },
      'email'
    );
  },
  onLoginWithGoogle: (user: UserInterface): void => {
    AnalyticsTealiumService().onUserLoggedIn(
      {
        user_email: user.email,
        user_id: user.userId,
        user_status: 'Logged In',
      },
      'google'
    );
  },
  onRegisterWithEmail: (user: UserInterface): void => {
    AnalyticsTealiumService().onUserRegistered({
      user_email: user.email,
      user_id: user.userId,
      user_status: 'Logged In',
    });
  },
  onLogout: (user: UserInterface | null): void => {
    if (user) {
      AnalyticsTealiumService().onUserLoggedOut({
        user_email: user.email,
        user_id: user.userId,
        user_status: 'Not Logged In',
      });
    }
  },
};
